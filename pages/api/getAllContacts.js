import initDB from "../../Helpers/initDB";
import Contacts from "../../Modal/ContactUs";
initDB();
export default async (req, res) => {
  try {
    const getAllContacts = await Contacts.find();
    res.status(200).json(getAllContacts);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
