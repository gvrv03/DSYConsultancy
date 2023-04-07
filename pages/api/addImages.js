import initDB from "../../Helpers/initDB";
import Colleges from "../../Modal/Colleges";
import Authenticated from "directsecondyearadmission/Helpers/Authenticated";
import { PUBLIC_ADMINKEY, PUBLIC_ROOTKEY } from "directsecondyearadmission/quieries/UserKeys";

initDB();

export default Authenticated(async (req, res) => {
  const { imageUrl, instituteCode } = req.body;
  try {
    if (req.decoded.userData.role == PUBLIC_ADMINKEY ||
      req.decoded.userData.role == PUBLIC_ROOTKEY ) {
      if (!imageUrl || !instituteCode) {
        return res.status(422).json({ error: "Please fill all the fields" });
      }

      const clgName = await Colleges.findOne({
        instituteCode: instituteCode,
      });
      if (!clgName) {
        return res.status(404).json({ error: "This Institute not Exists" });
      }

      const filter = { instituteCode: instituteCode };
      const update = { $push: { images: imageUrl } };
      const addImages = await Colleges.findOneAndUpdate(filter, update);
      res.status(201).json({ msg: "Image Added", addImages });
    } else {
      res.status(403).json({ error: "Access Denied" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
