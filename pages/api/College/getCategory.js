import initDB from "directsecondyearadmission/Helpers/initDB";
import CollegeDepartment from "directsecondyearadmission/Modal/CollegeDepartment";
import CollegeCategory from "directsecondyearadmission/Modal/CollegeCategory";
import Colleges from "directsecondyearadmission/Modal/Colleges";
initDB();
export default async function handler(req, res) {
  try {
    const { id } = req.body;
    const getCat = await CollegeCategory.find({
      CollegeDetails: id,
    }).populate("CollegeDepartment");

    if (!getCat) {
      return res.status(500).json({ error: "Department not Exists" });
    }
    
    return res.status(200).json(getCat);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
