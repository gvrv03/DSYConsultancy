import {
  FaceSmileIcon,
  ChartBarSquareIcon,
  CursorArrowRaysIcon,
  DevicePhoneMobileIcon,
  AdjustmentsHorizontalIcon,
  SunIcon,
} from "@heroicons/react/24/solid";

import benefitOneImg from "../public/img/benefit-one.png";
import benefitTwoImg from "../public/img/benefit-two.png";

const benefitOne = {
  title: "Key features of DSY Consultancy !",
  desc: "We are here to provide the best services regarding your college procedures without having any major complications.",
  image: benefitOneImg,
  bullets: [
    {
      title: "Expert Guidance",
      desc: "Expert guidance on admission process and eligibility criteria.",
      icon: <FaceSmileIcon />,
    },
    {
      title: "Customized solutions",
      desc: "Customized solutions tailored to meet individual needs and interests.",
      icon: <ChartBarSquareIcon />,
    },
    {
      title: "Admission assistance",
      desc: "Admission assistance including document verification and submission, and scholarship information.",
      icon: <CursorArrowRaysIcon />,
    },
  ],
};

const benefitTwo = {
  title: "Steps",
  desc: " Here are some steps to clear your idea with the DSY Process for finding the best college preference based on your academics results and social category. ",
  image: benefitTwoImg,
  bullets: [
    {
      title: "Complete your profile",
      desc: "Complete your profile to receive college recommendations",
      icon: <DevicePhoneMobileIcon />,
    },
    {
      title: "Find College",
      desc: "Find college based on your Category, Percentage and etc.",
      icon: <AdjustmentsHorizontalIcon />,
    },
    {
      title: "Get expert help",
      desc: "Get expert help to upload documents, pay the fee, confirm admission.",
      icon: <SunIcon />,
    },
  ],
};

export { benefitOne, benefitTwo };
