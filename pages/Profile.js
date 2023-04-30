import HomeLayout from "directsecondyearadmission/Layout/HomeLayout";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import BasicDetails from "directsecondyearadmission/Components/BasicDetails";
import ContactDetails from "directsecondyearadmission/Components/ContactDetails";
import EducationDetails from "directsecondyearadmission/Components/EducationDetails";
import PreferenceDetails from "directsecondyearadmission/Components/PreferenceDetails";

const Profile = () => {
  return (
    <HomeLayout>
      <Head>
        <title>DSY consultancy | Profile</title>
        <meta
          name="keywords"
          content="Direct Second Year Admission, Consultancy Services, Admission Assistance, Education Counseling, Admission Consultancy, College Admission Guidance, Admission Process, Admission Requirements, Engineering Admissions, After Diploma Admissions, DSY, Direct Second Year Admission Consultancy | DSY, Direct Second Year Admission Consultancy, Direct Second Year Admission, DSY consultancy, DSY consultancy | Profile"
        />

        <meta name="title" content="DSY consultancy | Profile" />
      </Head>
      <BasicDetails />
      <ContactDetails />
      <EducationDetails />
      <PreferenceDetails />
    </HomeLayout>
  );
};

export default Profile;
