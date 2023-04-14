import app from "directsecondyearadmission/firebase";
function Authenticated(icomponent) {
  return async (req, res) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ error: "You must logged in" });
    }

    const token = req.headers.authorization.split("Bearer ")[1];
    try {
      const decoded = await app.auth().verifyIdToken(authorization);
      console.log(decoded);
    } catch (error) {
      console.log(error);
    }
  };
}
export default Authenticated;
