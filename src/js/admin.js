let globalDoctors = [];

document.addEventListener("DOMContentLoaded", () => {
  function addDoctorsToTable(doctors) {
    const tableBody = document.querySelector("#adminDoctorsTable tbody");
    doctors.forEach((doctor) => {
      const row = `
        <tr>
          <th scope="row">${doctor.id}</th>
          <td>${doctor.name}</td>
          <td>${doctor.specialty}</td>
          <td>${doctor.years_of_experience}</td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });
  }

// Simulación de llamada a una API REST para obtener datos de doctores
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

  async function listarDoctoresAdmin() {
    try {
      const doctors = await fetchDoctors("./src/data/doctors.json");
      const newDoctors = await fetchDoctors("./src/data/doctorsNew.json");
      const allDoctors = [...doctors, ...newDoctors];
      globalDoctors = allDoctors;
      addDoctorsToTable(allDoctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  }

  // Llamar a la función para listar los doctores en la tabla de admin.html
  listarDoctoresAdmin();

  function createNewDoctor() {
    // recuperar los valores de los inputs
    const name = document.getElementById("name").value;
    const specialty = document.getElementById("specialty").value;
    const description = document.getElementById("description").value;
    const image = document.getElementById("image").value;
    const years_of_experience = document.getElementById("years_of_experience").value;
    const days = document.getElementById("days").value;
    const hours = document.getElementById("hours").value;
    // crear un nuevo objeto doctor
    const newDoctor = {
      id: globalDoctors.length + 1,
      name,
      specialty,
      description,
      image,
      years_of_experience,
      disponibility: {
        days: days.split(","),
        hours: hours.split(","),
      },
    };
    // agregar el nuevo doctor al arreglo globalDoctors
    globalDoctors.push(newDoctor);
    // agregar el nuevo doctor a la tabla
    addDoctorsToTable([newDoctor]);
  }

  // Buscar por un doctor en la tabla de admin.html
  const searchInput = document.getElementById("searchDoctor"); // Input de búsqueda
  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      // Evento input para detectar cambios en el input
      const searchValue = event.target.value.toLowerCase(); // Valor del input en minúsculas
      const tableBody = document.querySelector("#adminDoctorsTable tbody");
      const rows = tableBody.rows;
      for (let i = 0; i < rows.length; i++) {
        const doctorName = rows[i].cells[1].textContent.toLowerCase();
        if (doctorName.includes(searchValue)) {
          rows[i].style.display = "";
        } else {
          rows[i].style.display = "none";
        }
      }
    });
  }

  const saveDoctorButton = document.getElementById('saveDoctorButton');
  if (saveDoctorButton) {
    saveDoctorButton.addEventListener('click', () => {
      createNewDoctor();
      // Cerrar el modal después de guardar el nuevo doctor
      const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
      modal.hide();
    });
  }

});
