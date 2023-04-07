import initDB from "../../Helpers/initDB";
import User from "directsecondyearadmission/Modal/User";
import Authenticated from "directsecondyearadmission/Helpers/Authenticated";
initDB();

export default Authenticated( async (req, res) => {
  const {
    sBoard,
    sSchool,
    sPassYear,
    sMarkType,
    sPercentage,
    cBoard,
    cSchool,
    cPassYear,
    cMarkType,
    cPercentage,
    id,
  } = req.body;

  try {
    if (
      !sBoard ||
      !sSchool ||
      !sPassYear ||
      !sMarkType ||
      !sPercentage ||
      !cBoard ||
      !cSchool ||
      !cPassYear ||
      !cMarkType ||
      !cPercentage ||
      !id
    ) {
      return res.status(401).json({ error: "Please fill all the fields" });
    }
    const progress = await User.findById(id);
    const process = 90;
    let newProcess = progress.profileCompletion;
    if (
      progress.profileCompletion < process &&
      progress.profileCompletion > 75
    ) {
      newProcess = process;
    }

    let eduDeatails = {
      ssc: {
        board: sBoard,
        school: sSchool,
        passingYear: sPassYear,
        markType: sMarkType,
        percentage: sPercentage,
      },
      diploma: {
        board: cBoard,
        school: cSchool,
        passingYear: cPassYear,
        markType: cMarkType,
        percentage: cPercentage,
      },
    };

    const update = {
      profileCompletion: newProcess,
      educationDetails: eduDeatails,
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
}
)