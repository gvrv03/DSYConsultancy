import initDB from "../../Helpers/initDB";
import Colleges from "../../Modal/Colleges";
initDB();

export default async (req, res) => {
  const { instituteCode } = req.body;

  try {
    const clgName = await Colleges.findOne({
      instituteCode: instituteCode,
    });
    const filter = { instituteCode: instituteCode };
    const curView = await Colleges.findOne(filter);
    // res.status(201).json({ msg: curView.views });

    const update = { views: curView.views + 1 };
    const addImages = await Colleges.findOneAndUpdate(filter, update);
    res.status(201).json({ msg: "Count Increment", addImages });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
