import initDB from "../../../Helpers/initDB";
import CollegeDepartment from "directsecondyearadmission/Modal/CollegeDepartment";
import CollegeCategory from "directsecondyearadmission/Modal/CollegeCategory";
import Colleges from "../../../Modal/Colleges";
initDB();
export default async function handler(req, res) {
  try {
    const { id } = req.query;
    const clgName = await Colleges.findById(id);
    if (!clgName) {
      return res.status(404).json({ error: "This Institute not Exists" });
    }

    return res.status(200).json(clgName);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
