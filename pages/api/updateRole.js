import Authenticated from "directsecondyearadmission/Helpers/Authenticated";
import { PUBLIC_ROOTKEY } from "directsecondyearadmission/quieries/UserKeys";
import initDB from "../../Helpers/initDB";
import User from "../../Modal/User";
initDB();

export default Authenticated(async (req, res) => {
  const { newRole, id } = req.body;

  try {
    if (req.decoded.role === "Root") {
      const filter = { role: newRole };
      const changeUser = await User.findByIdAndUpdate(id, filter);
      res.status(201).json({
        msg: changeUser.credentails.fName + " now " + newRole,
        role: newRole,
      });
    } else {
      res.status(403).json({ error: "Access Denied" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
