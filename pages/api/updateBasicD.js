import initDB from "../../Helpers/initDB";
import User from "directsecondyearadmission/Modal/User";
import Authenticated from "directsecondyearadmission/Helpers/Authenticated";
initDB();

export default async (req, res) => {
  const {
    fullName,
    dob,
    socialCategory,
    gender,
    maritialStatus,
    phyChanged,
    id,
  } = req.body;

  try {
    if (
      !fullName ||
      !dob ||
      !socialCategory ||
      !gender ||
      !maritialStatus ||
      !phyChanged ||
      !id
    ) {
      return res.status(401).json({ error: "Please fill all the fields" });
    }

    const progress = await User.findOne({ "credentails.firebaseID": id });

    let newProcess = progress.profileCompletion;

    if (progress.basicDetails.isFill === false) {
      newProcess = progress.profileCompletion + 20;
    }

    let bDeatails = {
      maritialStatus: maritialStatus,
      dob: dob,
      socialCategory: socialCategory,
      phyChanged: phyChanged,
      gender: gender,
      fName: fullName,
      isFill: true,
    };

    const update = {
      profileCompletion: newProcess,
      basicDetails: bDeatails,
      "credentails.fName": fullName,
    };

    console.log(newProcess);
    const userData = await User.findOneAndUpdate(
      { "credentails.firebaseID": id },
      update
    );

    if (!userData) {
      return res.status(404).json({ error: "This User not Exists" });
    }

    return res.status(201).json({
      process: newProcess,
      msg: "User Updated Successfull",
      userData,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
