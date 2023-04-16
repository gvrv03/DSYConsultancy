import axios from "axios";
import baseUrl from "directsecondyearadmission/baseUrl";

// To get user Data
export async function getUserData(id) {
  const res = await axios.get(baseUrl + "/api/User/" + id, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const userData = await res.data;
  if (userData.error) {
    return {
      notFound: true,
    };
  }

  return userData;
}

// get all user Contacts data
export async function getAllContacts() {
  const res = await axios.get(baseUrl + "api/getAllContacts", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const userData = await res.data;
  return userData;
}
