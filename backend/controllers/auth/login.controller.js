const User = require("../../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { email, password, rememberMe } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  if (rememberMe) console.log("Remember Me");
  else console.log("Do not remember Me");
  const foundUser = await User.findOne({ email }).exec();
  if (!foundUser) return res.sendStatus(401); //Unauthorized
  // evaluate password
  const match = await bcrypt.compare(password, foundUser.password);
  const expRefreshToken = rememberMe ? 2 * 24 * 60 * 60 : 1 * 60 * 60;

  if (match) {
    // create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: foundUser.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "20s" }
    );
    const refreshToken = jwt.sign(
      { email: foundUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: expRefreshToken }
    );
    // Saving refreshToken with current user
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);
    // console.log(roles);

    // Creates Secure Cookie with refresh token
    rememberMe
      ? res.cookie("jwt", refreshToken, {
          httpOnly: true,
          // sameSite: "None",
          // secure: true,
          maxAge: 2 * 24 * 60 * 60 * 1000,
        })
      : res.cookie("jwt", refreshToken, {
          httpOnly: true,
          // sameSite: "None",
          // secure: true,
          maxAge: 1 * 60 * 60 * 1000,
        });

    // Send authorization roles and access token to user
    res.json({
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      accessToken,
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
