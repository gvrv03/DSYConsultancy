import HomeLayout from "directsecondyearadmission/Layout/HomeLayout";
import React, { useState, useEffect } from "react";
import baseUrl from "directsecondyearadmission/baseUrl";

import Link from "next/link";
import Head from "next/head";
import collegeContext from "directsecondyearadmission/Context/collegeContext";
import { useContext } from "react";
import { useRouter } from "next/router";
import { getUserData } from "directsecondyearadmission/quieries/UserDataQuieries";
import {
  allCategory,
  allColleges,
} from "directsecondyearadmission/quieries/CollegeDataQuieries";
import BasicDetails from "./Components/BasicDetails";
import { ModelHeader } from "./Components/ModelHeader";
import ContactDetails from "./Components/ContactDetails";
import EducationDetails from "./Components/EducationDetails";
import PreferenceDetails from "./Components/PreferenceDetails";

const Profile = ({ userData, CollegeData }) => {
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
      <BasicDetails userData={userData} />
      <ContactDetails userData={userData} />
      <EducationDetails userData={userData} />
      <PreferenceDetails userData={userData} CollegeData={CollegeData} />
    </HomeLayout>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.query;
  // const context = useContext(collegeContext);
  const userData = await getUserData(id);
  const CollegeData = await allColleges();

  return {
    props: { userData, CollegeData },
  };
}
export default Profile;
