document.addEventListener('DOMContentLoaded', async () => {
  const loadServices = async () => {
    try {
      const res = await fetch('./src/data/service.json');
      if (!res.ok) {
        console.error(`Response status: ${Response.status}`);
        return null;
      }
      return res.json();
    } catch (e) {
      console.error(`Error loading services: ${e}`);
      return null;
    }
  };

  const createServiceCard = ({ service, details, icon }) => `
    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12">
        <div class="service__card card d-flex flex-column align-items-center m-0">
            <i class="card__icon mdi ${icon}"></i>
            <h4 class="card__title">${service}</h4>
            <p class="mt-2"> ${details}</p>
        </div>
    </div>
  `;

  const servicesContainer = document.getElementById('servicios');
  const services = await loadServices();

  if (!services || services.length === 0) {
    servicesContainer.innerHTML += `<h3 class="section__title--light"> Por el momento no podemos mostrar nuestros servicios. </h3>`;
    return;
  }

  let currentContainer;
  for (let i = 0; i < services.length; i++) {
    // Cada 4 elementos se crea una nueva columna
    if (i % 4 === 0) {
      currentContainer = document.createElement('div');
      currentContainer.classList.add('row');
      currentContainer.classList.add('services_row');
      currentContainer.classList.add('mb-4');
    }
    currentContainer.innerHTML += createServiceCard(services[i]);

    // Si es el 4 elemento de una columna o si es el ultimo elemento de la lista
    // se añade la columna al contenedor principal
    if (i % 4 === 3 || i === services.length - 1) {
      servicesContainer.appendChild(currentContainer);
    }
  }
});
