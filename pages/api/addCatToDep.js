import initDB from "../../Helpers/initDB";
import CollegeCategory from "directsecondyearadmission/Modal/CollegeCategory";
import CollegeDepartment from "directsecondyearadmission/Modal/CollegeDepartment";
initDB();

export default async (req, res) => {
  const { depID } = req.body;

  try {
    const response = await CollegeCategory.find({ CollegeDepartment: depID });
    if (!response) {
      res.status(500).json({ error: "Not Found" });
    }

    const addCat = await CollegeDepartment.findByIdAndUpdate(depID, {
      $push: { DepCategory: response },
    });


    return res.json(response);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
