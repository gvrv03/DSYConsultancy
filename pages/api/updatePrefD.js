import initDB from "../../Helpers/initDB";
import User from "directsecondyearadmission/Modal/User";
import Authenticated from "directsecondyearadmission/Helpers/Authenticated";
initDB();

export default async (req, res) => {
  const {
    university,
    branch,
    location,
    collegeType,
    needLoan,
    id,
    CatSeatType,
  } = req.body;
  try {
    if (
      !university ||
      !branch ||
      !location ||
      !collegeType ||
      !needLoan ||
      !id ||
      !CatSeatType
    ) {
      return res.status(401).json({ error: "Please fill all the fields" });
    }

    const progress = await User.findOne({ "credentails.firebaseID": id });
    const process = 100;
    let newProcess = progress.profileCompletion;
    if (progress.preferences.isFill === false) {
      newProcess = progress.profileCompletion + 20;
    }

    let pDeatails = {
      needLoan: needLoan,
      branch: branch,
      location: location,
      collegeType: collegeType,
      university: university,
      isFill: true,
      CatSeatType: CatSeatType,
    };

    const update = {
      profileCompletion: newProcess,
      preferences: pDeatails,
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
      msg: "User Updated Sucessfll",
      userData,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
