import HomeLayout from "directsecondyearadmission/Layout/HomeLayout";
import React, { useState, useEffect } from "react";

import Link from "next/link";
import Head from "next/head";
import {
  allCategory,
  allColleges,
} from "directsecondyearadmission/quieries/CollegeDataQuieries";
import BasicDetails from "directsecondyearadmission/Components/BasicDetails";
import ContactDetails from "directsecondyearadmission/Components/ContactDetails";
import EducationDetails from "directsecondyearadmission/Components/EducationDetails";
import PreferenceDetails from "directsecondyearadmission/Components/PreferenceDetails";
import { useUserAuth } from "directsecondyearadmission/Context/UserAuthContext";

const Profile = ({ CollegeData }) => {
  const { user } = useUserAuth();
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
      <PreferenceDetails CollegeData={CollegeData} />
    </HomeLayout>
  );
};

export async function getServerSideProps() {
  const CollegeData = await allColleges();

  return {
    props: { CollegeData },
  };
}
export default Profile;
