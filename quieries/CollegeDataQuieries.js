import baseUrl from "directsecondyearadmission/baseUrl";

//get single college data
export async function getSingleCollegeData(id) {
  const res = await fetch(baseUrl + "/api/College/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
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
  const res = await fetch(baseUrl + "/api/Colleges", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}
