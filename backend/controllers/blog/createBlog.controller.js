const { Blog, Tag, User } = require("../../model/index");
const multer = require("multer");
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads/blogs");
  },
  filename: function (req, file, callback) {
    console.log(file, file.mimetype);
    callback(null, uuid() + "-" + format(new Date(), "yyyyMMddHHmmss") + "." + file.mimetype.split("/")[1]);
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

const createBlog = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      // ERROR occurred (here it can be occurred due
      // to uploading image of size greater than
      // 10MB or uploading different file type)
      return res.status(400).json({ message: `Error during uploading image: ${err}` });
    } else {
      // SUCCESS, image successfully uploaded
      console.log(req.body);
      const { title, tag, content } = req.body;
      var tagId = req.body.tagId;
      if (!tagId || !title || !tag || !content)
        return res.status(400).json({ message: "All fields are required" });
      console.log(req.body);
      const author = req.user;
      const image = res.req.file.filename;

      const foundUser = await User.findOne({ where: { email: author } });
      if (!foundUser)
        return res.status(403).json({ message: "User not found" }); //Forbidden

      if (tagId === "-1") {
        // Tag is unique, creating new tag
        try {
          //create and store the new tag
          const findTag = await Tag.findOne({ where: { name: tag } });
          if (!findTag) {
            const newTag = await Tag.create({
              name: tag,
              userId: foundUser.id,
            });
            tagId = newTag.id;
          } else {
            tagId = findTag.id;
          }
        } catch (err) {
          res
            .status(400)
            .json({ message: `Error during Tag creation: ${err.message}` });
        }
      }

      try {
        //create and store the new tag
        const result = await Blog.create({
          image,
          title,
          content,
          userId: foundUser.id,
          tagId,
        });

        res.status(201).json({ message: `Blog created!` });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
  });
};

module.exports = { createBlog };
