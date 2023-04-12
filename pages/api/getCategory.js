import initDB from "../../Helpers/initDB";
import CollegeCategory from "directsecondyearadmission/Modal/CollegeCategory";
initDB();

export default async (req, res) => {
  try {
    const getAllCategory = await CollegeCategory.find();
    res.status(200).json(getAllCategory);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
