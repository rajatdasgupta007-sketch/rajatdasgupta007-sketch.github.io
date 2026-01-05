async function searchPlace() {
  const place = document.getElementById("placeInput").value.trim();
  if (!place) {
    alert("Enter a place name");
    return;
  }

  // ---------- LOCATION DATA ----------
  const geoURL = `https://nominatim.openstreetmap.org/search?format=json&q=${place}&limit=1`;

  const geoRes = await fetch(geoURL, {
    headers: {
      "User-Agent": "GeoPortal/1.0 (student project)"
    }
  });

  const geoData = await geoRes.json();

  if (geoData.length === 0) {
    alert("Place not found");
    return;
  }

  const lat = geoData[0].lat;
  const lon = geoData[0].lon;

  document.getElementById("placeName").innerText = geoData[0].display_name;
  document.getElementById("lat").innerText = lat;
  document.getElementById("lon").innerText = lon;

  // ---------- IMAGE ----------
  document.getElementById("placeImage").src =
    `https://source.unsplash.com/600x400/?${place}`;

  // ---------- BASIC FLORA & FAUNA (STATIC + SAFE) ----------
  document.getElementById("floraFauna").innerText =
    "Flora and fauna vary based on climate and region. This area supports native plant species and wildlife adapted to local environmental conditions.";

  document.getElementById("result").style.display = "block";
}