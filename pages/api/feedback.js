import initDB from "../../Helpers/initDB";
import FeedBack from "directsecondyearadmission/Modal/FeedBack";
initDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getFeedback(req, res);
      break;
    case "POST":
      await addFeedback(req, res);
      break;
  }
};
const addFeedback = async (req, res) => {
  const { uName, message, objID } = req.body;
  try {
    if (!uName || !objID || !message) {
      return res.status(401).json({ error: "Please fill all the fields" });
    }

    const addFeedback = await new FeedBack({
      uName: uName,
      message: message,
      User: objID,
    }).save();
    res.status(201).json({ msg: "Thanks for your Feedback !", addFeedback });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getFeedback = async (req, res) => {
  try {
    const allfeedback = await FeedBack.find().populate("User");
    res.status(200).json(allfeedback);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
