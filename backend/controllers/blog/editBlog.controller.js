const { Blog, Tag, User } = require("../../model/index");
const multer = require("multer");
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const { promisify } = require("util");

const unlinkAsync = promisify(fs.unlink);

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads/blogs");
  },
  filename: function (req, file, callback) {
    console.log(file, file.mimetype);
    callback(
      null,
      uuid() +
        "-" +
        format(new Date(), "yyyyMMddHHmmss") +
        "." +
        file.mimetype.split("/")[1]
    );
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10000000, // 10MB
  },
  fileFilter: (req, file, callback) => {
    console.log(file);
    if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
      return callback(new Error("Please upload a Picture(PNG or JPEG)"));
    }
    callback(undefined, true);
  },
}).single("image");

const editBlog = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      // ERROR occurred (here it can be occurred due
      // to uploading image of size greater than
      // 10MB or uploading different file type)
      return res
        .status(500)
        .json({ message: `Error during uploading image: ${err}` });
    } else {
      // SUCCESS, image successfully uploaded
      const author = req.user;
      const slug = req.params.slug;
      const imgPath = req.file?.path;
      const imgName = req.file?.filename;
      const { title, tag, content } = req.body;

      if (!title || !tag || !content) {
        if (imgPath) await unlinkAsync(imgPath);
        return res.status(400).json({ message: "All fields are required" });
      }

      const foundBlog = await Blog.findOne({
        where: { slug },
        attributes: ["id", "title", "content"],
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "email"],
          },
        ],
      });

      if (!foundBlog) {
        if (imgPath) await unlinkAsync(imgPath);
        return res.status(404).json({ message: "Blog does not exist" }); //Not Found
      }

      const prevImgName = foundBlog.image;

      if (author !== foundBlog.user.email) {
        if (imgPath) await unlinkAsync(imgPath);
        return res
          .status(401)
          .json({ message: "You are not Authorized to edit" }); //Unauthorized
      }

      try {
        // Find or create the tag
        const [findOrCreateTag, _created] = await Tag.findOrCreate({
          where: { name: tag },
          defaults: { name: tag, userId: foundBlog.user.id },
        });

        console.log("findOrCreateTag: ", findOrCreateTag.dataValues);
        foundBlog.update({
          image: imgName,
          title,
          content,
          userId: foundBlog.user.id,
          tagId: findOrCreateTag.dataValues.id,
        });

        if (imgPath && imgName) {
          if (prevImgName) {
            console.log("Deleting previous image", prevImgName);
            await unlinkAsync(`/uploads/blogs/${prevImgName}`);
          }
        }

        res.status(200).json({ message: `Blog updated!` });
        
      } catch (err) {

        if (imgPath) await unlinkAsync(imgPath);
        res.status(500).json({ message: err.message });
      }
    }
  });
};

module.exports = { editBlog };
