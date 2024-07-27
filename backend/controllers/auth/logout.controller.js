const { UserCredentials } = require("../../model/index");

const handleLogout = async (req, res) => {
  // On client, also delete the accessToken
  const cookies = req.cookies;
  console.log(JSON.stringify(cookies));
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  const foundUserCred = await UserCredentials.findOne({
    where: { refreshToken },
  });
  if (!foundUserCred) {
    res.clearCookie("jwt", { httpOnly: true }); // , sameSite: "None" , secure: true
    return res.sendStatus(204);
  }

  // Delete refreshToken in db
  console.log(foundUserCred.refreshToken);
  foundUserCred.refreshToken = null;
  const result = await foundUserCred.save();
  console.log(result);

  res.clearCookie("jwt", { httpOnly: true }); // , sameSite: "None" , secure: true
  res.sendStatus(204);
};

module.exports = { handleLogout };
