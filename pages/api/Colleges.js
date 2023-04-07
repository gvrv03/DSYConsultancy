import Authenticated from "directsecondyearadmission/Helpers/Authenticated";
import { PUBLIC_ADMINKEY, PUBLIC_ROOTKEY } from "directsecondyearadmission/quieries/UserKeys";
import initDB from "../../Helpers/initDB";
import Colleges from "../../Modal/Colleges";
initDB();
export default async (req, res) => {

  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  switch (req.method) {
    case "GET":
      await getCollege(req, res);
      break;
    case "POST":
      await addCollege(req, res);
      break;
  }
};

// To Add College
const addCollege = Authenticated(async (req, res) => {
  try {
    if (req.decoded.userData.role == PUBLIC_ADMINKEY ||
      req.decoded.userData.role == PUBLIC_ROOTKEY) {
      const {
        name,
        instituteCode,
        iframe,
        collegeUnder,
        collegeType,
        university,
        addressLine,
        taluka,
        district,
        city,
        latitude,
        longitude,
        rating,
        contactNo,
        website,
        email,
        approvedBy,
        image,
        topRecruiters,
        addedBy,
      } = req.body;

      if (
        !name ||
        !instituteCode ||
        !iframe ||
        !collegeUnder ||
        !collegeType ||
        !university ||
        !addressLine ||
        !taluka ||
        !district ||
        !city ||
        !latitude ||
        !longitude ||
        !rating ||
        !contactNo ||
        !website ||
        !email ||
        !approvedBy ||
        !image ||
        !topRecruiters ||
        !addedBy
      ) {
        return res.status(401).json({ error: "please fill all the fields" });
      }
      const checkCollege = await Colleges.findOne({ instituteCode });
      if (checkCollege) {
        return res.status(200).json({ error: "Already College Added" });
      }
      const college = await new Colleges({
        name,
        instituteCode,
        iframe,
        collegeUnder,
        collegeType,
        university,
        location: {
          addressLine,
          taluka,
          district,
          city,
          latitude,
          longitude,
        },
        rating,
        contacts: {
          contactNo,
          website,
          email,
        },
        approvedBy,
        addedBy: addedBy,
        image,
        topRecruiters,
      }).save();
      res.status(201).json({ msg: "College Added", college });
    } else {
      res.status(403).json({ error: "Access Denied" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getCollege = async (req, res) => {
  try {
    const getAllCollege = await Colleges.find();
    res.status(200).json(getAllCollege);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
