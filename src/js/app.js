// Utilizo for para recorrer listado de Doctores de JSON y mostrarlos en la página web.
document.addEventListener('DOMContentLoaded', function () {
  function listarDoctores() {
    fetch('./src/data/doctors.json')
      .then(response => response.json())
      .then(doctors => {
        const doctorsContainer = document.getElementById('doctores');
        for (let i = 0; i < doctors.length; i++) {
          const doctor = doctors[i];
          const doctorCard = `
            <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
              <div class="card team__card mx-auto">
                <img src="./src/images/${doctor.image}" class="team__image" alt="doctor">
                <div class="card-body text-center">
                  <h5 class="card-title">${doctor.name}</h5>
                  <div class="card__chip">${doctor.specialty}</div>
                  <p class="card-text">${doctor.description}</p>
                </div>
              </div>
            </div>
          `;
          doctorsContainer.innerHTML += doctorCard;
        }
      })
      .catch(error => console.error('Error fetching doctors:', error));
  }

  function orderDoctorsByExperience(doctors) {
    if (doctors.length <= 1) {
      return doctors;
    }
    const pivot = doctors[doctors.length - 1].years_of_experience; // Último elemento del array
    const left = []; // Menores a pivot
    const right = []; // Mayores a pivot
    for (let i = 0; i < doctors.length - 1; i++) { // Recorrer todos los elementos menos el último
      if (doctors[i].years_of_experience > pivot) { // Si el elemento es menor al pivot lo agregamos a la izquierda, si no a la derecha
        left.push(doctors[i]);
      } else {
        right.push(doctors[i]);
      }
    }
    return [...orderDoctorsByExperience(left), doctors[doctors.length - 1], ...orderDoctorsByExperience(right)]; // Ordenamos los menores a la izquierda, los mayores a la derecha y concatenamos el resultado
  }

  // Filtro para buscar por médicos con igual o más de 5 años de experiencia.
  function showExperienceDoctors() {
    fetch('./src/data/doctors.json')
      .then(response => response.json())
      .then(doctors => {
        const doctorsContainer = document.getElementById('doctores');
        const filteredDoctors = doctors.filter(doctor => doctor.years_of_experience >= 5);
        const orderedDoctors = orderDoctorsByExperience(filteredDoctors);
        doctorsContainer.innerHTML = '';
        for (let i = 0; i < orderedDoctors.length; i++) {
          const doctor = orderedDoctors[i];
          const doctorCard = `
            <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
              <div class="card team__card mx-auto">
                <img src="./src/images/${doctor.image}" class="team__image" alt="doctor">
                <div class="card-body text-center">
                  <h5 class="card-title">${doctor.name}</h5>
                  <div class="card__chip
                  ">${doctor.specialty}</div>
                  <p class="card-text">${doctor.description}</p>
                </div>
              </div>
            </div>
          `;
          doctorsContainer.innerHTML += doctorCard;
        }
      }
      )
      .catch(error => console.error('Error fetching doctors:', error));
  }

    const checkboxExperience = document.getElementById('checkYearsOfExperience');
    if (checkboxExperience) {
      checkboxExperience.addEventListener('change', (event) => {
        if (event.target.checked) {
          showExperienceDoctors();
        } else {
          listarDoctores();
        }
      });
    }
  listarDoctores();

  // Destructuring en JavaScript
  let doctor = {
    name: 'Dr. Juan Pérez',
    specialty: 'Cardiología',
    years_of_experience: 10,
    image: 'doctor-1.jpg',
  };
  let { name, specialty, years_of_experience, image } = doctor;
  console.log('Ejemplo Destructuring:', name, specialty, years_of_experience, image);

  // Clonación de un objeto JSON
  let doctorNewList = JSON.parse(JSON.stringify(doctor));
  doctorNewList.name = 'Dr. Ana García';
  doctorNewList.specialty = 'Cirujana Plástica';
  doctorNewList.years_of_experience = 8;
  doctorNewList.image = 'dr11.png';

  console.log('Original doctor:', doctor);
  console.log('Modified doctor:', doctorNewList);

  // Merge de objetos JSON
  fetch('./src/data/doctorsNew.json')
    .then(response => response.json())
    .then(newDoctors => {
      fetch('./src/data/doctors.json')
        .then(response => response.json())
        .then(doctors => {
          const mergedDoctors = [...doctors, ...newDoctors];
          const doctorsContainer = document.getElementById('doctores');
          doctorsContainer.innerHTML = '';
          for (let i = 0; i < mergedDoctors.length; i++) {
            const doctor = mergedDoctors[i];
            const doctorCard = `
              <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                <div class="card team__card mx-auto">
                  <img src="./src/images/${doctor.image}" class="team__image" alt="doctor">
                  <div class="card-body text-center">
                    <h5 class="card-title">${doctor.name}</h5>
                    <div class="card__chip">${doctor.specialty}</div>
                    <p class="card-text">${doctor.description}</p>
                  </div>
                </div>
              </div>
            `;
            doctorsContainer.innerHTML += doctorCard;
          }
        })
        .catch(error => console.error('Error fetching doctors:', error));
    })
    .catch(error => console.error('Error fetching new doctors:', error));
});

// Clases en JavaScript y Programación Orientada a Objetos
class Doctor {
  constructor(name, lastName, specialty, years_of_experience, patients_attended) {
    this.name = name;
    this.lastName = lastName;
    this.fullName = `${name} ${lastName}`;
    this.specialty = specialty;
    this.years_of_experience = years_of_experience;
    this._years_of_experience = years_of_experience; // Encapsulamiento
    this.patients_attended = patients_attended;

    this.getYearsOfExperience = function() {
      return this._years_of_experience; // Método para obtener el valor de years_of_experience que es la variable encapsulada
    }
  }

  showInfo() {
    return `El Doctor ${this.fullName}, de especialidad ${this.specialty}, cuenta con ${this.years_of_experience} años de experiencia.`;
  }

  totalPatients() {
    return `El total de pacientes atendidos por el Doctor ${this.fullName}, fueron ${this.patients_attended}.`;
  }
}
// Ejemplo de uso de la clase Doctor y de cómo acceder a una variable encapsulada a través de un método.
const doctor = new Doctor('María','Gómez', 'Pediatría', 5, 200);
console.log(doctor.getYearsOfExperience());


class Cirujano extends Doctor { // Subclase Cirujano que hereda de la clase Doctor
  constructor(name, lastName, specialty, years_of_experience, patients_attended, surgeries_performed) { // Añadimos el atributo surgeries_performed
    super(name, lastName, specialty, years_of_experience, patients_attended); // Llamamos al constructor de la clase padre
    this.surgeries_performed = surgeries_performed; // Atributo propio de la subclase Cirujano
  }

  showInfo() {
    return `${super.showInfo()} Ha realizado ${this.surgeries_performed} cirugías.`;
  }

  totalSurgeries() {
    return `El total de cirugías realizadas por el Doctor ${this.fullName} es ${this.surgeries_performed}.`;
  }

  //Polimorfismo: Sobreescribo la función totalPatients de la clase Doctor, para que muestre un mensaje diferente.
  totalPatients() {
    return `El total de pacientes atendidos por el Cirujano ${this.fullName}, fueron ${this.patients_attended}. De estos, ${this.surgeries_performed} fueron pacientes que se sometieron a cirugía.`;
  }
}

// Ejemplo de uso de la subclase Cirujano
const cirujano = new Cirujano('Carlos','López', 'Cirugía General', 15, 300, 120);
console.log(cirujano.showInfo());
console.log(cirujano.totalPatients());
console.log(cirujano.totalSurgeries());



// Programación Funcional en JavaScript

// Función que usa currying para calcular el costo total de los servicios, en función del número de consultas realizadas y precio de cada consulta.
const calculateTotalCost = numberOfConsultations => pricePerConsultation => numberOfConsultations * pricePerConsultation;

// Función de flecha para simplificar la sintaxis en una función que calcule el tiempo promedio de espera de los pacientes.
const calculateAverageWaitingTime = (totalWaitingTime, numberOfPatients) => totalWaitingTime / numberOfPatients;

// Función recursiva para calcular el total de horas de consulta en una semana.
const calculateTotalConsultationHours = (hoursPerDay, days) => {
  if (days === 0) return 0;
  return hoursPerDay + calculateTotalConsultationHours(hoursPerDay, days - 1);
};

// Composición de funciones para aplicar descuentos a los costos de las consultas en base a la cantidad de consultas realizadas.
const applyDiscount = discount => cost => cost - (cost * discount);
const calculateDiscountedCost = (pricePerConsultation, numberOfConsultations, discount) => {
  const totalCost = calculateTotalCost(pricePerConsultation)(numberOfConsultations);
  return applyDiscount(discount)(totalCost);
};

// Ejemplos de uso de las funciones de programación funcional
const totalCost = calculateTotalCost(50)(10);
console.log('Costo Total:', totalCost); // 500

const averageWaitingTime = calculateAverageWaitingTime(120, 10);
console.log('Tiempo de espera promedio:', averageWaitingTime); // 12

const totalConsultationHours = calculateTotalConsultationHours(8, 5);
console.log('Total de horas de consulta:', totalConsultationHours); // 40

const discountedCost = calculateDiscountedCost(50, 10, 0.1);
console.log('Costo con descuento aplicado:', discountedCost); // 450
