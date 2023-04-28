import initDB from "../../Helpers/initDB";
import CollegeCategory from "directsecondyearadmission/Modal/CollegeCategory";
import Colleges from "../../Modal/Colleges";
import CollegeDepartment from "directsecondyearadmission/Modal/CollegeDepartment";
initDB();

export default async (req, res) => {
  const {
    category,
    min,
    max,
    aFees,
    aSeats,
    choiceCode,
    seatTypeMax,
    seatTypeMin,
  } = req.body;

  try {
    if (
      !category ||
      !min ||
      !max ||
      !aFees ||
      !aSeats ||
      !choiceCode ||
      !seatTypeMax ||
      !seatTypeMin
    ) {
      return res.status(422).json({ error: "please fill all the fields" });
    }

    const checkDep = await CollegeDepartment.findOne({
      choiceCode: choiceCode,
    });
    if (!checkDep) {
      return res.status(404).json({ error: "Department not exists" });
    }

    let CollegeId = checkDep.CollegeDetails;
    let depId = checkDep._id;

    const checkDepCat = await CollegeCategory.findOne({
      CollegeDepartment: depId,
      category,
    });

    if (checkDepCat) {
      return res.status(404).json({ error: "Category Already Exists" });
    }

    let studentCategory = {
      category,
      min,
      max,
      aFees,
      aSeats,
      seatTypeMax,
      seatTypeMin,
      CollegeDetails: CollegeId,
      CollegeDepartment: depId,
    };

    const addCat = await CollegeCategory(studentCategory).save();

    await CollegeDepartment.findByIdAndUpdate(depId, {
      $push: { DepCategory: addCat._id },
    });

    res.status(201).json({ msg: "Category Added", addCat });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", err });
  }
};
