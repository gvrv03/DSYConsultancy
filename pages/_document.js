import { Html, Head, Main, NextScript } from "next/document";
import baseUrl from "directsecondyearadmission/baseUrl";
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="google-site-verification"
          content="s8FoQiGue_nCxwS6Vv5lkDzFYIl4sX2F6zb_A5g4Oyw"
        />
        {/* <!-- Primary Meta Tags --> */}

        <meta
          name="keywords"
          content="Direct Second Year Admission, Consultancy Services, Admission Assistance, Education Counseling, Admission Consultancy, College Admission Guidance, Admission Process, Admission Requirements, Engineering Admissions, After Diploma Admissions, DSY, DSY Consultancy | Direct Second Year Admission Consultancy, Direct Second Year Admission Consultancy, Direct Second Year Admission"
        />

        <meta
          name="title"
          content="DSY Consultancy | Direct Second Year Admission Consultancy"
        />
        <meta
          name="description"
          content="Looking for guidance and support in securing admission to second year engineering courses in India? Our Direct Second Year Admission Consultancy can help you navigate the application process, understand eligibility criteria, and select the right college for your academic goals. Contact us today to start your journey towards a successful career in engineering."
        />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={baseUrl} />
        <meta
          property="og:title"
          content="DSY Consultancy | Direct Second Year Admission Consultancy"
        />
        <meta
          property="og:description"
          content="Looking for guidance and support in securing admission to second year engineering courses in India? Our Direct Second Year Admission Consultancy can help you navigate the application process, understand eligibility criteria, and select the right college for your academic goals. Contact us today to start your journey towards a successful career in engineering."
        />
        <meta property="og:image" content="/img/hero.png" />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={baseUrl} />
        <meta
          property="twitter:title"
          content="DSY Consultancy | Direct Second Year Admission Consultancy"
        />
        <meta
          property="twitter:description"
          content="Looking for guidance and support in securing admission to second year engineering courses in India? Our Direct Second Year Admission Consultancy can help you navigate the application process, understand eligibility criteria, and select the right college for your academic goals. Contact us today to start your journey towards a successful career in engineering."
        />
        <meta property="twitter:image" content="/img/hero.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
