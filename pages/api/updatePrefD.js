import initDB from "../../Helpers/initDB";
import User from "directsecondyearadmission/Modal/User";
import Authenticated from "directsecondyearadmission/Helpers/Authenticated";
initDB();

export default Authenticated(async (req, res) => {
  const { university, branch, location, collegeType, needLoan, id } = req.body;
  try {
    if (
      !university ||
      !branch ||
      !location ||
      !collegeType ||
      !needLoan ||
      !id
    ) {
      return res.status(401).json({ error: "Please fill all the fields" });
    }

    const progress = await User.findById(id);
    const process = 100;
    let newProcess = progress.profileCompletion;
    if (
      progress.profileCompletion < process &&
      progress.profileCompletion > 85
    ) {
      newProcess = process;
    }
    let pDeatails = {
      needLoan: needLoan,
      branch: branch,
      location: location,
      collegeType: collegeType,
      university: university,
    };

    const update = {
      profileCompletion: newProcess,
      preferences: pDeatails,
    };
    const userData = await User.findOneAndUpdate({ _id: id }, update);

    if (!userData) {
      return res.status(404).json({ error: "This User not Exists" });
    }
    res.status(201).json({
      process: progress.profileCompletion,
      msg: "User Updated Sucessfll",
      userData,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
