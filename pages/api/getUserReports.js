import initDB from "../../Helpers/initDB";
import ReportIssue from "directsecondyearadmission/Modal/ReportIssue";
initDB();
export default async (req, res) => {
  const { objectID } = req.body;
  try {
    const reports = await ReportIssue.find({ user: objectID });
    // console.log(reports);
    res.status(201).json(reports);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
