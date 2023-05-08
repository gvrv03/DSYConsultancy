import "../styles/globals.css";
import ScrollToTop from "react-scroll-up";
import Footer from "directsecondyearadmission/Components/Footer";
import Nav from "directsecondyearadmission/Components/Nav";
import CollegeState from "directsecondyearadmission/Context/CollegeState";
import Router from "next/router";

import AOS from "aos";
import "aos/dist/aos.css";

import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import { UserAuthContexProvider } from "directsecondyearadmission/Context/UserAuthContext";
import { CollegeContexProvider } from "directsecondyearadmission/Context/CollegesContext";
import { UserContexProvider } from "directsecondyearadmission/Context/UserContext";
import { useEffect } from "react";
import { AdminContexProvider } from "directsecondyearadmission/Context/AdminContext";
import ErrorBoundary from "directsecondyearadmission/Components/ErrorBoundary";
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
NProgress.configure({ showSpinner: false });

export default function App({ Component, pageProps }) {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <CollegeState>
      <UserAuthContexProvider>
        <AdminContexProvider>
          <UserContexProvider>
            <CollegeContexProvider>
              <Nav />
              <ErrorBoundary>
                <Component {...pageProps} />
              </ErrorBoundary>
              <Footer />
              <ScrollToTop showUnder={160}>
                <i className="bi text-3xl pColor bi-arrow-up-square-fill"></i>
              </ScrollToTop>
            </CollegeContexProvider>
          </UserContexProvider>
        </AdminContexProvider>
      </UserAuthContexProvider>
    </CollegeState>
  );
}
