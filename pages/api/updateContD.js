import initDB from "../../Helpers/initDB";
import User from "directsecondyearadmission/Modal/User";
import Authenticated from "directsecondyearadmission/Helpers/Authenticated";
initDB();

export default async (req, res) => {
  const { mobileNo, email, city, state, id } = req.body;

  try {
    if (!mobileNo || !email || !city || !state || !id) {
      return res.status(401).json({ error: "Please fill all the fields" });
    }
    const progress = await User.findOne({ "credentails.firebaseID": id });
    let newProcess = progress.profileCompletion;
    if (progress.contactDetails.isFill === false) {
      newProcess = progress.profileCompletion + 20;
    }

    let cDeatails = {
      mobileNo,
      email,
      city,
      state,
      isFill: true,
    };

    const update = {
      profileCompletion: newProcess,
      contactDetails: cDeatails,
    };

    const userData = await User.findOneAndUpdate(
      { "credentails.firebaseID": id },
      update
    );

    if (!userData) {
      return res.status(404).json({ error: "This User not Exists" });
    }
    res.status(201).json({
      process: newProcess,
      msg: "User Updated Successfull",
      userData,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
