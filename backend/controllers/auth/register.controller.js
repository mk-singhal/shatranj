const { User, UserCredentials } = require("../../model/index");
const bcrypt = require("bcrypt");

const validateUsername = async (req, res) => {
  const { username } = req.body
  if (!username) return res.status(400).json({ message: "Username is required." });
  try {
    const dupUsername = await User.findOne({ where: { username } });
    if (dupUsername)
      return res.status(409).json({ message: "Username is taken" }); //Conflict
    res.status(200).json({ message: "Username is available" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
  

const handleNewUser = async (req, res) => {
  const { username, firstName, lastName, email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  if (!username || !firstName)
    return res
      .status(400)
      .json({ message: "First name and username are required." });

  // check for duplicate usernames in the db
  const dupUsername = await User.findOne({ where: { username } });
  if (dupUsername)
    return res.status(409).json({ message: "Username is taken" }); //Conflict
  
  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ where: { email } });
  if (duplicate)
    return res.status(409).json({ message: "Email already registered" }); //Conflict

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);

    //create and store the new user
    const result = await User.create({
      username,
      firstName,
      lastName,
      email,
      password: hashedPwd,
    });

    await UserCredentials.create({
      userId: result.id,
      password: hashedPwd,
    });

    // console.log(result);

    res
      .status(201)
      .json({ success: `New user \'${firstName + " " + lastName}\' created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser, validateUsername };
