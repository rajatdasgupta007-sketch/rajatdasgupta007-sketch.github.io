// 🔹 PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL BELOW
const URL = "https://script.google.com/macros/s/AKfycbwT6XoLUn_aY259E4-A3rasr68vQnXaxFtRD9Oh0t9qlLlFI8b6ESx6rb4fCVwwVJFEFg/exec";

/* =========================
   ADD ATTENDANCE
========================= */
function addAttendance() {
  const date = document.getElementById("date").value;
  const roll = document.getElementById("roll").value;
  const status = document.getElementById("status").value;

  if (!date || !roll) {
    alert("Please fill all fields");
    return;
  }

  fetch(URL, {
    method: "POST",
    body: JSON.stringify({
      date: date,
      roll: roll,
      status: status
    })
  })
  .then(() => {
    alert("Attendance added successfully");
  })
  .catch(error => {
    alert("Error adding attendance: " + error);
  });
}

/* =========================
   VIEW ATTENDANCE REPORT
========================= */
function getAttendance() {
  const roll = document.getElementById("checkRoll").value;

  if (!roll) {
    alert("Enter roll number");
    return;
  }

  fetch(URL + "?roll=" + roll)
    .then(response => response.json())
    .then(data => {
      document.getElementById("output").innerHTML = `
        <p>Total Days: ${data.total}</p>
        <p>Present Days: ${data.present}</p>
        <p>Absent Days: ${data.absent}</p>
        <p>Off Days: ${data.off}</p>
        <p><b>Attendance %: ${data.percent}</b></p>
      `;
    })
    .catch(error => {
      alert("Error fetching report: " + error);
    });
}