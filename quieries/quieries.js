// for Department
export const collegeByUnder = (selectedunder, colleges, district,Category) => {
  let filterCollege = !selectedunder.length
    ? colleges
    : colleges.filter((clgDetail) =>
        selectedunder.includes(clgDetail.CollegeDetails.collegeUnder)
      );

  if (!filterCollege) {
    return colleges;
  }
  // Sorting by district
  return district == ""
    ? filterCollege
    : filterCollege.filter((filterClg) =>
        district.includes(filterClg.CollegeDetails.location.district)
      );
};

// for Colleges
export const collegeByUnderCollege = (selectedunder, colleges, district) => {
  let filterCollege = !selectedunder.length
    ? colleges
    : colleges.filter((clgDetail) =>
        selectedunder.includes(clgDetail.collegeUnder)
      );

  if (!filterCollege) {
    return colleges;
  }
  // Sorting by district
  return district == ""
    ? filterCollege
    : filterCollege.filter((filterClg) =>
        district.includes(filterClg.location.district)
      );
};
