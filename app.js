document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("attendanceForm");
  const qrContainer = document.getElementById("qrContainer");
  const attendanceTable = document.getElementById("attendanceTable").querySelector("tbody");

  // Manejar el envío del formulario
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Obtener datos del formulario
    const name = document.getElementById("name").value.trim();
    const grade = document.getElementById("grade").value;
    const isVisitor = document.getElementById("visitor").checked;

    if (name === "") {
      alert("Por favor, ingresa un nombre.");
      return;
    }

    // Generar el código QR
    const qrData = `Nombre: ${name}\nGrado: ${grade}\nVisitante: ${isVisitor ? "Sí" : "No"}`;
    generateQr(qrData);

    // Agregar el registro a la tabla
    addToTable(name, grade, isVisitor);
  });

  // Generar el código QR y mostrarlo en pantalla
  function generateQr(data) {
    qrContainer.innerHTML = ""; // Limpiar el contenedor
    QRCode.toCanvas(qrContainer, data, (error) => {
      if (error) {
        console.error("Error al generar el QR:", error);
      }
    });
  }

  // Agregar un registro a la tabla de asistencia
  function addToTable(name, grade, isVisitor) {
    const row = attendanceTable.insertRow();
    row.insertCell(0).innerText = name;
    row.insertCell(1).innerText = grade;
    row.insertCell(2).innerText = isVisitor ? "Sí" : "No";
  }
});
