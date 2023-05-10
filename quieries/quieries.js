export const CollegeFilterAfter = (
  selectedunder,
  colleges,
  defdistrict,
  district,
  collegeName,
  defbranch,
  branch,
  defuniversity,
  university
) => {
  let filterCollege = !selectedunder.length
    ? colleges
    : colleges.filter((clgDetail) =>
        selectedunder.includes(clgDetail.CollegeDetails.collegeUnder)
      );

  if (!filterCollege) {
    return colleges;
  }

  if (!branch) {
    let DistrictFilter = filterCollege.filter((filterClg) =>
      defbranch.includes(filterClg.courseName)
    );
    return DistrictFilter;
  }

  // After District Filter
  let DistrictFilter = !district
    ? filterCollege.filter((filterClg) =>
        defdistrict.includes(filterClg.CollegeDetails.location.district)
      )
    : district === "all"
    ? filterCollege
    : filterCollege.filter((filterClg) =>
        district.includes(filterClg.CollegeDetails.location.district)
      );

  let CollegeFilter =
    !collegeName || collegeName === "all"
      ? DistrictFilter
      : DistrictFilter.filter((filterClg) =>
          collegeName.includes(filterClg.CollegeDetails.name)
        );

  let BranchFilter = !branch
    ? CollegeFilter.filter((filterClg) =>
        defbranch.includes(filterClg.courseName)
      )
    : branch === "all"
    ? CollegeFilter
    : CollegeFilter.filter((filterClg) =>
        branch.includes(filterClg.courseName)
      );

  let UniversityFilter = !university
    ? BranchFilter.filter((filterClg) =>
        defuniversity.includes(filterClg.CollegeDetails.university)
      )
    : university === "all"
    ? BranchFilter
    : BranchFilter.filter((filterClg) =>
        university.includes(filterClg.CollegeDetails.university)
      );

  return UniversityFilter;
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
