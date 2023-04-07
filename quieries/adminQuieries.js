import baseUrl from "directsecondyearadmission/baseUrl";

// for show all Colleges
export async function getColleges() {
  const res = await fetch(baseUrl + "/api/Colleges", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}

export async function getallUsers() {
  const res = await fetch(baseUrl + "/api/signUp", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  
  return data;
}
