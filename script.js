
const URL = "https://script.google.com/macros/s/AKfycbwA7RKIz75-Mc4vfwgrc7u38ivZ8FO3VUfRo07Yeek5bzWBJTq0V85gVQNEOM77iBGlZg/exec";


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
  .then(() => {
    alert("Attendance added");
  })
  .catch(err => {
    alert("Error: " + err);
  });
}

// VIEW ATTENDANCE
function getAttendance() {
  const roll = document.getElementById("checkRoll").value;

  if (!roll) {
    alert("Enter roll number");
    return;
  }

  fetch(URL + "?roll=" + roll)
    .then(res => res.json())
    .then(data => {
      document.getElementById("output").innerHTML = `
        <p>Total Days: ${data.total}</p>
        <p>Present: ${data.present}</p>
        <p>Absent: ${data.absent}</p>
        <p>Off Days: ${data.off}</p>
        <p><b>Attendance %: ${data.percent}</b></p>
      `;
    })
    .catch(err => {
      alert("Error: " + err);
    });
}