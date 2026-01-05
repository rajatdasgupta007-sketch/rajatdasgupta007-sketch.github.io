async function searchPlace() {
  const place = document.getElementById("placeInput").value.trim();
  if (!place) {
    alert("Enter a place name");
    return;
  }

  // --- LOCATION DATA ---
  const geoURL = `https://nominatim.openstreetmap.org/search?format=json&q=${place}&limit=1`;

  const geoRes = await fetch(geoURL, {
    headers: {
      "User-Agent": "GeoPortal/1.0"
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

  // --- IMAGE FROM WIKIMEDIA (VERY RELIABLE) ---
  const imageURL =
    `https://commons.wikimedia.org/wiki/Special:FilePath/${place.replace(/ /g, "_")}.jpg`;

  const img = document.getElementById("placeImage");
  img.src = imageURL;

  // Fallback image if not found
  img.onerror = () => {
    img.src = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
  };

  // --- INFO TEXT ---
  document.getElementById("floraFauna").innerText =
    "This region supports natural flora and fauna adapted to its climate and geography.";

  document.getElementById("result").style.display = "block";
}