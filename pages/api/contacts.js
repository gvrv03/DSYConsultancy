import initDB from "../../Helpers/initDB";
import ContactUs from "directsecondyearadmission/Modal/ContactUs";
initDB();

export default async (req, res) => {
  const { uName, phoneNo, email, message } = req.body;
  try {
    if (!uName || !phoneNo || !email || !message) {
      return res.status(401).json({ error: "Please fill all the fields" });
    }
    const contactStatus = await new ContactUs({
      uName,
      phoneNo,
      email,
      message,
    }).save();

    res.status(201).json({ msg: "Thanks for Contact Us !", contactStatus });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
