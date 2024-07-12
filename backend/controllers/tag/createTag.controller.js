const { Tag, User } = require("../../model/index");
const jwt = require("jsonwebtoken");

const handleNewTag = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt)
    return res.status(401).json({ message: "Cookies are required." }); //Unauthorized
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ where: { refreshToken } });
  if (!foundUser) return res.sendStatus(403); //Forbidden
  // evaluate jwt
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err || foundUser.email !== decoded.email) return res.sendStatus(403); //Forbidden
    }
  );
  const tag = req.body.tag;
  if (!tag) return res.status(400).json({ message: "Tag name is required." });

  try {
    //create and store the new tag
    const result = await Tag.create(
      {
        name: tag,
        userId: foundUser.id,
      }
    );

    res.status(201).json({ success: `New tag \'${tag}\' created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewTag };
