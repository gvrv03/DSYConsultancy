import initDB from "../../Helpers/initDB";
import Scheduled from "directsecondyearadmission/Modal/Scheduled";
initDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getSchedule(req, res);
      break;
    case "POST":
      await addSchedule(req, res);
      break;
  }
};

const addSchedule = async (req, res) => {
  const { name, scheduleTime, scheduleFor, scheduleDate, objectID } = req.body;
  try {
    if (!name || !scheduleTime || !scheduleFor || !scheduleDate || !objectID) {
      return res.status(401).json({ error: "Please fill all the fields" });
    }

    await new Scheduled({
      name,
      scheduleTime,
      scheduleFor,
      scheduleDate,
      user: objectID,
    }).save();

    const date = new Date(scheduleDate);

    const shortDate =
      date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

    return res
      .status(201)
      .json({ msg: "Scheduled on " + shortDate + " at " + scheduleTime });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

async function getSchedule(req, res) {
  try {
    const reports = await Scheduled.find();

    res.status(201).json(reports);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
