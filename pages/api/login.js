import initDB from "../../Helpers/initDB";
import User from "directsecondyearadmission/Modal/User";
var CryptoJS = require("crypto-js");
import jwt from "jsonwebtoken";
initDB();
export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await signUpUser(req, res);
      break;
  }
};

// To Add College
const signUpUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(401).json({ error: "Please fill all the fields" });
    }
    const checkUserEmail = await User.findOne({
      "credentails.email": email,
    });
    if (!checkUserEmail) {
      return res.status(401).json({ error: "User Not Found" });
    }
    var bytes = CryptoJS.AES.decrypt(
      checkUserEmail.credentails.password,
      process.env.CRYPTO_SECRET
    );
    var decryptedPass = bytes.toString(CryptoJS.enc.Utf8);

    if (
      checkUserEmail.credentails.email == email &&
      password == decryptedPass
    ) {
      const token = jwt.sign(
        {
          userId: User._id,
          userData: checkUserEmail,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

    
      return res
        .status(200)
        .json({ msg: "Login Successfull", token, userDetail: checkUserEmail });
    } else {
      return res.status(401).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
