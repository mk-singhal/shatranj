const { Tag, User } = require("../../model/index");

const handleTag = async (req, res) => {
  try {
    //create and store the new tag
    const result = await Tag.findAll(
      {
        include: {
          model: User,
          as: "user",
        }
      }
    );

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleTag };
