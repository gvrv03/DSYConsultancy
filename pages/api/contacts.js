import initDB from "../../Helpers/initDB";
import ContactUs from "directsecondyearadmission/Modal/ContactUs";
import { renderToString ,renderToStaticMarkup} from "react-dom/server";
import Nav from "../Components/Nav";
initDB();

function MyComponent() {
  return (
    <div>
     Message Send 
     <br />
     <a href="/">Go Home</a>
    </div>
  );
}

export default async (req, res) => {
  const { uName, phoneNo, email, message } = req.query;
  try {
    if (!uName || !phoneNo || !email || !message) {
      return res.status(401).json({ error: "Please fill all the fields" });
    }
    const contactStatus = await new ContactUs({
      uName,
      phoneNo,
      email,
      message,
    }).save();
    const html = renderToStaticMarkup(<MyComponent />);
    res.send(html);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
