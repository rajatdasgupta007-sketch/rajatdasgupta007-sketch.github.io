async function searchPlace() {
  const place = document.getElementById("placeInput").value.trim();
  if (!place) {
    alert("Please enter a place name");
    return;
  }

  // ---------- FETCH LOCATION DATA ----------
  const geoURL = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${place}&limit=1`;

  const geoRes = await fetch(geoURL, {
    headers: { "User-Agent": "GeoPortal-StudentProject" }
  });

  const geoData = await geoRes.json();
  if (geoData.length === 0) {
    alert("Place not found");
    return;
  }

  const data = geoData[0];
  const address = data.address || {};

  // ---------- BASIC INFO ----------
  document.getElementById("placeName").innerText = data.display_name;
  document.getElementById("lat").innerText = data.lat;
  document.getElementById("lon").innerText = data.lon;

  document.getElementById("country").innerText =
    address.country || "N/A";

  document.getElementById("state").innerText =
    address.state || address.region || "N/A";

  document.getElementById("type").innerText =
    data.type ? data.type.toUpperCase() : "N/A";

  // ---------- CLIMATE (BASIC LOGIC) ----------
  const lat = Math.abs(parseFloat(data.lat));
  let climate = "Temperate";

  if (lat < 23.5) climate = "Tropical";
  else if (lat > 66.5) climate = "Polar";

  document.getElementById("climate").innerText = climate;

  // ---------- ELEVATION ----------
  document.getElementById("elevation").innerText =
    data.extratags && data.extratags.ele
      ? data.extratags.ele + " m"
      : "Data not available";

  // ---------- IMAGE (WIKIMEDIA) ----------
  const img = document.getElementById("placeImage");
  img.src = `https://upload.wikimedia.org/wikipedia/commons/8/80/${place.replace(/ /g, "_")}.jpg`;

  img.onerror = () => {
    img.src =
      "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
  };

  // ---------- FLORA & FAUNA ----------
  document.getElementById("floraFauna").innerText =
    "The flora and fauna of this region depend on its climate, elevation, and geographical location.";

  document.getElementById("result").style.display = "block";
}