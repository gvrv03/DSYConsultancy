export async function getNews() {
  const res = await fetch(
    "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=ca280d477a00450f9d97e4fb1d4883f3",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const getNewsData = await res.json();
  if (getNewsData.error) {
    return {
      notFound: true,
    };
  }

  return getNewsData;
}
