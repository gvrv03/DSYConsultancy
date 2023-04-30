import app from "directsecondyearadmission/firebase";
import User from "directsecondyearadmission/Modal/User";
function Authenticated(icomponent) {
  return async (req, res) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ error: "You must logged in" });
    }
    try {
      const decoded = await User.findOne({
        "credentails.firebaseID": authorization,
      });
      if (!decoded) {
        return res.status(401).json({ error: "You must logged in" });
      }

      if (
        decoded.role === process.env.NEXT_PUBLIC_ADMINKEY ||
        decoded.role === process.env.NEXT_PUBLIC_ROOTKEY
      ) {
        req.decoded = decoded;
        return icomponent(req, res);
      } else {
        return res.status(401).json({ error: "You need Authorization" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };
}
export default Authenticated;
