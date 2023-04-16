import baseUrl from "directsecondyearadmission/baseUrl";
import axios from "axios";
//get single college data
export async function getSingleCollegeData(id) {
  const res = await axios.get(baseUrl + "/api/College/" + id, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.data;
  if (data.error) {
    return {
      notFound: true,
    };
  }
  await fetch(baseUrl + "/api/viewsIn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      instituteCode: data.instituteCode,
    }),
  });
  return data;
}

// for show all Colleges
export async function allColleges() {
  // for show all Colleges
  const res = await axios.get(baseUrl + "/api/Colleges", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.data;
  return data;
}

// for show all Category
export async function allCategory() {
  // for show all Colleges
  const res = await fetch(baseUrl + "/api/getCategory", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}
