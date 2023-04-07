import baseUrl from "directsecondyearadmission/baseUrl";

// To get user Data
export async function getUserData(id) {
  const res = await fetch(baseUrl + "/api/User/" + id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const userData = await res.json();
  if (userData.error) {
    return {
      notFound: true,
    };
  }

  return userData;
}

// get all user Contacts data
export async function getAllContacts() {
  const res = await fetch(baseUrl + "api/getAllContacts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const userData = await res.json();
  return userData;
}
