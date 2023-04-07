import initDB from "../../Helpers/initDB";
import Colleges from "../../Modal/Colleges";
initDB();
export default async (req, res) => {
  try {
    const getAllCollege = await Colleges.find();
    res.status(200).json(getAllCollege);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
