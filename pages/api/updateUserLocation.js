import Authenticated from "../../Helpers/Authenticated";
import initDB from "../../Helpers/initDB";
import User from "../../Modal/User";
initDB();

export default Authenticated(async (req, res) => {
  const { latitude, longitude } = req.body;
  try {
    let id = req.decoded.userData._id;
    let coOrdinates = {
      longitude: longitude,
      latitude: latitude,
    };

    const filter = { coOrdinates: coOrdinates };
    await User.findByIdAndUpdate(id, filter);

    res.status(201).json({
      Location: coOrdinates,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
