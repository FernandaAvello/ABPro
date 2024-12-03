class Queue {
  // FIFO
  constructor() {
    // Constructor de la clase
    this.citas = [];
  }

  enqueue(nuevaCita) {
    // Método para agregar un elemento a la cola
    this.citas.push(nuevaCita);
  }

  dequeue() {
    // Método para eliminar el primer elemento de la cola
    if (this.isEmpty()) {
      return "No hay pacientes en la cola";
    }
    return this.citas.shift();
  }

  isEmpty() {
    // Método para verificar si la cola está vacía
    return this.citas.length === 0;
  }

  queueLength() {
    // Método para obtener la longitud de la cola
    return this.citas.length;
  }
}

// VARIABLES
let globalDoctors = [];
let appointments = new Queue();

function getDoctorsID() {
  const select = document.getElementById("doctorSelect");
  const selectedDoctorID = select.options[select.selectedIndex].value;
  return selectedDoctorID;
}

// Función para mostrar los días disponibles del doctor seleccionado
function selectedDoctorsDay(doctor) {
  const days = doctor.disponibility.days;
  const daysSelect = document.getElementById("daySelect");
  daysSelect.innerHTML = "";
  days.forEach((day) => {
    const option = document.createElement("option");
    option.value = day;
    option.textContent = day;
    daysSelect.appendChild(option);
  });
}

// Función para mostrar las horas disponibles del doctor seleccionado
function selectedDoctorHour(doctor) {
  const hours = doctor.disponibility.hours;
  const hoursSelect = document.getElementById("hourSelect");
  hoursSelect.innerHTML = "";
  hours.forEach((hour) => {
    const option = document.createElement("option");
    option.value = hour;
    option.textContent = hour;
    hoursSelect.appendChild(option);
  });
}

// Función para obtener los doctores desde un archivo JSON
function fetchDoctors(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(url)
        .then((response) => response.json())
        .then((doctors) => resolve(doctors))
        .catch((error) => reject(error));
    }, 1000);
  });
}

// Evento que se ejecuta cuando el DOM ha sido cargado y lista los doctores en el select
document.addEventListener("DOMContentLoaded", function () {
  async function listarDoctores() {
    try {
      const doctors = await fetchDoctors("./src/data/doctors.json");
      const newDoctors = await fetchDoctors("./src/data/doctorsNew.json");
      const allDoctors = [...doctors, ...newDoctors];
      globalDoctors = allDoctors;
      const select = document.getElementById("doctorSelect");
      allDoctors.forEach((doctor) => {
        const option = document.createElement("option");
        option.value = doctor.id;
        option.textContent = doctor.name;
        select.appendChild(option);
      });
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  }
  listarDoctores();
});

// Evento que se ejecuta cuando se selecciona un doctor y muestra los días y horas disponibles
document.getElementById("doctorSelect").addEventListener("change", function () {
  const doctorID = getDoctorsID();
  const doctor = globalDoctors.find((doctor) => doctor.id == doctorID);
  selectedDoctorsDay(doctor);
  selectedDoctorHour(doctor);
});

// Evento que se ejecuta cuando se envía el formulario de la cita y agrega la cita a la cola
const addApointmentToTable = (appointment, isFirst) => {
  const table = document.getElementById("appointmentTable");
  const row = table.insertRow(-1);
  const appointmentIDCell = row.insertCell(0);
  const patientNameCell = row.insertCell(1);
  const patientPhoneCell = row.insertCell(2);
  const patientEmailCell = row.insertCell(3);
  const doctorCell = row.insertCell(4);
  const dayCell = row.insertCell(5);
  const hourCell = row.insertCell(6);
  const actionCell = row.insertCell(7);

  appointmentIDCell.textContent = appointment.id;
  patientNameCell.textContent = appointment.patientName;
  patientPhoneCell.textContent = appointment.patientPhone;
  patientEmailCell.textContent = appointment.patientEmail;
  doctorCell.textContent = appointment.doctor;
  dayCell.textContent = appointment.day;
  hourCell.textContent = appointment.hour;

  // Si es la primera cita en la cola, se muestra el botón de atender cita
  if (isFirst) {
    const attendButton = document.createElement("button");
    attendButton.textContent = "Atender";
    attendButton.className = "btn btn-success";
    attendButton.onclick = () => {
      alert(`Atendiendo a ${appointment.patientName}`);
      appointments.dequeue();
      showAppointments();
    };
    actionCell.appendChild(attendButton);
  }
}

// Función para mostrar las citas en la tabla de citas
const showAppointments = () => {
  const table = document.getElementById("appointmentTable");
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
  table.innerHTML = ''
  appointments.citas.forEach((appointment, index) => {
    addApointmentToTable(appointment, index === 0);
  });
}

// Evento que se ejecuta cuando se envía el formulario de la cita y agrega la cita a la cola
document.getElementById("appointmentForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const doctorID = getDoctorsID();
  const doctor = globalDoctors.find((doctor) => doctor.id == doctorID);
  const day = document.getElementById("daySelect").value;
  const hour = document.getElementById("hourSelect").value;
  const patientName = document.getElementById("patientName").value;
  const patientPhone = document.getElementById("patientPhone").value;
  const patientEmail = document.getElementById("patientEmail").value;
  const newAppointment = {
    id: appointments.queueLength() + 1,
    doctor: doctor.name,
    day: day,
    hour: hour,
    patientName: patientName,
    patientPhone: patientPhone,
    patientEmail: patientEmail,
  };
  appointments.enqueue(newAppointment);
  showAppointments();
  alert("Cita agendada con éxito");
  document.getElementById("appointmentForm").reset();
});

console.log("Citas", appointments);