import initDB from "../../Helpers/initDB";
import Colleges from "../../Modal/Colleges";
import Authenticated from "../../Helpers/Authenticated";

initDB();
export default Authenticated(async (req, res) => {
  const { instituteCode } = req.body;
  const filter = { instituteCode: instituteCode };
  try {
    const checkInstitute = await Colleges.findOne(filter);
    if (checkInstitute) {
      return res
        .status(201)
        .json({ error: "College already Exists", code: instituteCode });
    } else {
      return res
        .status(201)
        .json({ msg: "College not Exists", code: instituteCode });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
