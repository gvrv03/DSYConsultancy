import Authenticated from "directsecondyearadmission/Helpers/Authenticated";
import { PUBLIC_ADMINKEY, PUBLIC_ROOTKEY } from "directsecondyearadmission/quieries/UserKeys";
import initDB from "../../Helpers/initDB";
import Colleges from "../../Modal/Colleges";
initDB();

export default Authenticated(async (req, res) => {
  const { category, min, max, aFees, aSeats, choiceCode } = req.body;
  let studentCategory = {
    category,
    min,
    max,
    aFees,
    aSeats,
  };

  const filter = { department: { $elemMatch: { choiceCode } } };
  const update = { $push: { "department.$.categories": studentCategory } };
  try {
    if (
      req.decoded.userData.role == PUBLIC_ADMINKEY ||
      req.decoded.userData.role == PUBLIC_ROOTKEY
    ) {
      if (!category || !min || !max || !aFees || !aSeats || !choiceCode) {
        return res.status(422).json({ error: "please fill all the fields" });
      }

      if (!filter) {
        return res.status(404).json({ error: "This choiceCode not Exists" });
      }
      const checkDep = await Colleges.findOne({
        department: { $elemMatch: { choiceCode } },
      });

      if (!checkDep) {
        return res.status(404).json({ error: "Department not exists" });
      }
      const checkCat = await Colleges.findOne({
        department: {
          $elemMatch: {
            choiceCode,
            categories: {
              $elemMatch: { category },
            },
          },
        },
      });
      if (checkCat) {
        return res.status(422).json({ error: "Category already added" });
      }
      const addCat = await Colleges.findOneAndUpdate(filter, update);
      res.status(201).json({ msg: "Category Added" });
    } else {
      res.status(403).json({ error: "Access Denied" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
