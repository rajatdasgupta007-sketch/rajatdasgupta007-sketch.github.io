async function searchPlace() {
  const place = document.getElementById("placeInput").value.trim();
  if (!place) {
    alert("Please enter a place name");
    return;
  }

  // ---------- FETCH LOCATION DATA ----------
  const geoURL = `https://nominatim.openstreetmap.org/search?format=json&q=${place}&limit=1`;

  const geoRes = await fetch(geoURL, {
    headers: {
      "User-Agent": "GeoPortal-StudentProject"
    }
  });

  const geoData = await geoRes.json();
  if (geoData.length === 0) {
    alert("Place not found");
    return;
  }

  document.getElementById("placeName").innerText =
    geoData[0].display_name;

  document.getElementById("lat").innerText = geoData[0].lat;
  document.getElementById("lon").innerText = geoData[0].lon;

  // ---------- PLACE IMAGE (WIKIMEDIA) ----------
  const img = document.getElementById("placeImage");

  img.src = `https://upload.wikimedia.org/wikipedia/commons/8/80/${place.replace(/ /g, "_")}.jpg`;

  img.onerror = () => {
    img.src =
      "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
  };

  // ---------- FLORA & FAUNA TEXT ----------
  document.getElementById("floraFauna").innerText =
    "The region supports diverse flora and fauna influenced by its climate, terrain, and geographical location.";

  // ---------- SHOW RESULT ----------
  document.getElementById("result").style.display = "block";
}