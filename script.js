const URL = "https://script.google.com/macros/s/AKfycbzaFykJ_Hy3Lp8SaH1-oo6nSXlvuPxPwZcbcVSN1jX6oQNs0M9xPZqu8EQ-yuWvipz2-g/exec";

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
    body: JSON.stringify({ date, roll, status })
  })
  .then(() => alert("Attendance Added"));
}

function getAttendance() {
  const roll = document.getElementById("checkRoll").value;

  fetch(`${URL}?roll=${roll}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("output").innerHTML = `
        <p>Total Days: ${data.total}</p>
        <p>Present: ${data.present}</p>
        <p>Absent: ${data.absent}</p>
        <p>Off Days: ${data.off}</p>
        <p><b>Attendance %: ${data.percent}</b></p>
      `;
    });
}