const { User, UserCredentials } = require("../../model/index");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  console.log("Refresh", JSON.stringify(cookies));
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUserId = await UserCredentials.findOne({ where: { refreshToken } });
  if (!foundUserId) return res.sendStatus(403); // Forbidden
  const foundUser = await User.findByPk(foundUserId.userId);
  if (!foundUser) return res.sendStatus(403); // Not Found
  // evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.email !== decoded.email) return res.sendStatus(403);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: decoded.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "20s" }
    );
    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
