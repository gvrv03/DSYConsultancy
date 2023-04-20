import initDB from "../../Helpers/initDB";
import User from "../../Modal/User";
initDB();

export default async (req, res) => {
  const { latitude, longitude, UID } = req.body;
  try {
    if (!latitude || !longitude || !UID) {
      return res.status(401).json({ error: "Please fill all the fields" });
    }

    let coOrdinates = {
      longitude: longitude,
      latitude: latitude,
    };

    const filter = { coOrdinates: coOrdinates };
    const userData = await User.findOneAndUpdate(
      { "credentails.firebaseID": UID },
      filter
    );

    if (!userData) {
      return res.status(500).json({ error: "User Not Exist" });
    }

    res.status(201).json(coOrdinates);
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
