async function searchPlace() {
  const place = document.getElementById("placeInput").value;
  if (!place) return alert("Enter a place name");

  // Get Latitude & Longitude
  const geoRes = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${place}`
  );
  const geoData = await geoRes.json();

  if (geoData.length === 0) {
    alert("Place not found");
    return;
  }

  const lat = geoData[0].lat;
  const lon = geoData[0].lon;

  document.getElementById("placeName").innerText = place;
  document.getElementById("lat").innerText = lat;
  document.getElementById("lon").innerText = lon;

  // Image from Unsplash (free)
  document.getElementById("placeImage").src =
    `https://source.unsplash.com/600x400/?${place}`;

  // Wikipedia summary (flora & fauna info)
  const wikiRes = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${place}`
  );
  const wikiData = await wikiRes.json();

  document.getElementById("floraFauna").innerText =
    wikiData.extract || "No data available";

  document.getElementById("result").style.display = "block";
}