export const GetCurrentLocation = async (longitude, latitude, token) => {
  const res = await fetch("/api/updateUserLocation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      latitude: latitude,
      longitude: longitude,
    }),
  });

  console.log(await res.json());
};
