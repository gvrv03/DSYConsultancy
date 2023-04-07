import "../styles/globals.css";
import ScrollToTop from "react-scroll-up";
import Footer from "./Components/Footer";
import Nav from "./Components/Nav";
import CollegeState from "directsecondyearadmission/Context/CollegeState";
import Router from "next/router";



import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
NProgress.configure({ showSpinner: false });

export default function App({ Component, pageProps }) {
  return (
    <CollegeState>
      <Nav />
      <Component {...pageProps} />
      <Footer />
      <ScrollToTop showUnder={160}>
        <i className="bi text-3xl pColor bi-arrow-up-square-fill"></i>
      </ScrollToTop>
    </CollegeState>
  );
}
