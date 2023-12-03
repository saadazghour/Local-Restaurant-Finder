export const fetchNearbyRestaurants = async () => {
  const API_KEY = process.env.API_KEY;
  const API_URL = process.env.API_URL;
  const CORS_PROXY_URL = process.env.CORS_PROXY_URL;

  try {
    // Example coordinates for San Francisco
    const latitude = 37.786882;
    const longitude = -122.399972;

    const queryURL = `${API_URL}/search?categories=restaurants&limit=10&latitude=${latitude}&longitude=${longitude}`;

    const res = await fetch(`${CORS_PROXY_URL}/${queryURL}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-requested-with": "xmlhttprequest",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const { businesses } = await res.json();
    return businesses;
  } catch (error) {
    throw new Error("Error fetching nearby restaurants");
  }
};
