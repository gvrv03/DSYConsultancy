import initDB from "../../../Helpers/initDB";
import Colleges from "../../../Modal/Colleges";
initDB();
export default async function handler(req, res) {
  try {
    const { id } = req.query;
    const clgName = await Colleges.findById(id);
    if (!clgName) {
      return res.status(404).json({ error: "This Institute not Exists" });
    }
    res.json(clgName);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
