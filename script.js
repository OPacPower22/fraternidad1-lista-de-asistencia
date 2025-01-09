let userList = [];

document.getElementById('userForm').onsubmit = function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const grade = document.getElementById('grade').value;
    const id = Date.now();

    const isVisitor = document.getElementById("visitor").checked;

    if (!name || (!isVisitor && !grade)) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    
    const user = { id, name, grade, date: new Date() };
    userList.push(user);
    
    generateQRCode(user);
    updateAttendanceList();
    document.getElementById('userForm').reset();
};

let qrData;
    if (isVisitor) {
      qrData = `Nombre: ${name}\nTipo: Visitante`;
    } else {
      qrData = `Nombre: ${name}\nGrado: ${grade}`;
    }

function generateQRCode(user) {
    const qrContainer = document.createElement('div');
    const qrCode = new QRCode(qrContainer, {
        text: `${user.id}|${user.name}|${user.grade}`,
        width: 100,
        height: 100
    });
    
    const label = document.createElement('p');
    label.textContent = `${user.name} - ${user.grade}`;
    
    qrContainer.appendChild(label);
    document.getElementById('qrContainer').appendChild(qrContainer);
}

function updateAttendanceList() {
    const list = document.getElementById('list');
    list.innerHTML = '';
    
    userList.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = `${user.name} - ${user.grade} (${formatDate(user.date)})`;
        list.appendChild(listItem);
    });
}

function generateReport() {
    let report = 'Reporte de Asistencia\n\n';
    const countByGrade = { Aprendiz: 0, Compañero: 0, Maestro: 0 };
    
    userList.forEach(user => {
        report += `${user.name} - ${user.grade} - ${formatDate(user.date)}\n`;
        countByGrade[user.grade]++;
    });
    
    report += '\nEstadísticas:\n';
    for (let grade in countByGrade) {
        report += `${grade}: ${countByGrade[grade]} asistentes\n`;
    }
    
    downloadReport(report);
}

function downloadReport(content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reporte_asistencia.txt';
    a.click();
    URL.revokeObjectURL(url);
}

function formatDate(date) {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}
