export const fetchNearbyRestaurants = async () => {
  const API_KEY = process.env.API_KEY;
  const API_URL = process.env.API_URL;
  const CORS_PROXY_URL = process.env.CORS_PROXY_URL;

  try {
    // Example coordinates for San Francisco
    const latitude = 37.786882;
    const longitude = -122.399972;
    const radius = 4000; // in meters (4 kilometers)

    if (!API_KEY || !API_URL || !CORS_PROXY_URL) {
      throw new Error("API credentials not found");
    }

    const queryURL = `${API_URL}/search?categories=restaurants&limit=50&latitude=${latitude}&longitude=${longitude}&radius=${radius}`;

    const res = await fetch(`${CORS_PROXY_URL}/${queryURL}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-requested-with": "xmlhttprequest",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    // If you get into this error, it means that the API key is incorrect or the API URL is incorrect.

    // You can Enable access to the API by visiting the following link: https://cors-anywhere.herokuapp.com/corsdemo

    // You can refer to this Docs link for more information: https://github.com/Rob--W/cors-anywhere/issues/301

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const { businesses } = await res.json();
    return businesses;
  } catch (error) {
    throw new Error("Error fetching nearby restaurants");
  }
};
