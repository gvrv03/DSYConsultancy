import initDB from "../../Helpers/initDB";
import Colleges from "../../Modal/Colleges";
import CollegeDepartment from "directsecondyearadmission/Modal/CollegeDepartment";
initDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getDepartment(req, res);
      break;
    case "POST":
      await addDepartment(req, res);
      break;
  }
};

const addDepartment = async (req, res) => {
  const { courseName, instituteCode, annalFee, choiceCode } = req.body;

  try {
    if (!courseName || !instituteCode || !annalFee || !choiceCode) {
      return res.status(422).json({ error: "please fill all the fields" });
    }

    const clgName = await Colleges.findOne({
      instituteCode: instituteCode,
    });

    if (!clgName) {
      return res.status(404).json({ error: "This Institute not Exists" });
    }

    const checkDep = await CollegeDepartment.findOne({
      choiceCode: choiceCode,
    });
    if (checkDep) {
      return res.status(404).json({ error: "This Department Already Exists" });
    }

    let dep = {
      courseName,
      CollegeDetails: clgName._id,
      annalFee,
      choiceCode,
      cName: clgName.name,
    };

    const addDep = await CollegeDepartment(dep).save();

    res.status(201).json({ msg: "Department Added", addDep });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getDepartment = async (req, res) => {
  try {
    const getAllDep = await CollegeDepartment.find().populate("CollegeDetails");
    return res.status(200).json(getAllDep);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
