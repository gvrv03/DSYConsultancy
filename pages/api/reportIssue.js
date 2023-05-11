import initDB from "../../Helpers/initDB";
import ReportIssue from "directsecondyearadmission/Modal/ReportIssue";
initDB();
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getReports(req, res);
      break;
    case "POST":
      await sendReport(req, res);
      break;
  }
};

const sendReport = async (req, res) => {
  const { issue, objectID } = req.body;
  try {
    if (!issue || !objectID) {
      return res.status(401).json({ error: "Please fill all the fields" });
    }
    await new ReportIssue({
      issueName: issue,
      user: objectID,
    }).save();

    return res.status(201).json({ msg: "Report sended" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

async function getReports(req, res) {
  try {
    const reports = await ReportIssue.find()

    res.status(201).json(reports);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
