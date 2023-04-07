import initDB from "../../Helpers/initDB";
import User from "directsecondyearadmission/Modal/User";
import Authenticated from "directsecondyearadmission/Helpers/Authenticated";
initDB();

export default Authenticated(async (req, res) => {
  const { mobileNo, email, city, state, id } = req.body;

  try {
    if (!mobileNo || !email || !city || !state || !id) {
      return res.status(401).json({ error: "Please fill all the fields" });
    }
    const progress = await User.findById(id);
    const process = 80;
    let newProcess = progress.profileCompletion;
    if (
      progress.profileCompletion < process &&
      progress.profileCompletion > 35
    ) {
      newProcess = process;
    }

    let cDeatails = {
      mobileNo,
      email,
      city,
      state,
    };

    const update = {
      profileCompletion: newProcess,
      contactDetails: cDeatails,
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
