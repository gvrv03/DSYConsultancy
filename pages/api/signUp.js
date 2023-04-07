import initDB from "../../Helpers/initDB";
import User from "directsecondyearadmission/Modal/User";
var CryptoJS = require("crypto-js");
initDB();
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getUsers(req, res);
      break;
    case "POST":
      await signUpUser(req, res);
      break;
  }
};

// To Add Users
const signUpUser = async (req, res) => {
  const { username, fName, email, password, cpassword } = req.body;

  try {
    if (!username || !fName || !email || !password) {
      return res.status(401).json({ error: "Please fill all the fields" });
    }
    const checkUserName = await User.findOne({
      "credentails.username": username,
    });
    const checkUserEmail = await User.findOne({
      "credentails.email": email,
    });

    if (checkUserName) {
      return res.status(200).json({ error: username + " Already Exist" });
    }
    if (checkUserEmail) {
      return res.status(200).json({ error: email + " Already Exist" });
    }

    const credentail = {
      fName,
      username,
      email,
      password: CryptoJS.AES.encrypt(password,process.env.CRYPTO_SECRET).toString(),
    };

    if (password == cpassword) {
      const userStatus = await new User({
        credentails: credentail,
        "basicDetails.fName": fName,
      }).save();
      res.status(201).json({ msg: "Account Created", userStatus });
    } else {
      res.status(400).json({ error: "Password not Matched" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const getAllUsers = await User.find();
    res.status(200).json(getAllUsers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
