import Authenticated from "directsecondyearadmission/Helpers/Authenticated";
import {
  PUBLIC_ADMINKEY,
  PUBLIC_ROOTKEY,
} from "directsecondyearadmission/quieries/UserKeys";
import initDB from "../../Helpers/initDB";
import Colleges from "../../Modal/Colleges";
initDB();

export default Authenticated(async (req, res) => {
  const { collegeDetail, instituteCode } = req.body;
  try {
    if (!collegeDetail || !instituteCode) {
      return res.status(401).json({ error: "Please fill all the fields" });
    }
    const clgName = await Colleges.findOne({
      instituteCode: instituteCode,
    });
    if (!clgName) {
      return res.status(404).json({ error: "This Institute not Exists" });
    }

    const filter = { instituteCode: instituteCode };
    const update = { fullDescription: collegeDetail };

    const addDetails = await Colleges.findOneAndUpdate(filter, update);
    res.status(201).json({ msg: "Description Added", addDetails });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
