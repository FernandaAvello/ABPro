# Proyecto Clínica

## Descripción

Este proyecto consiste en una página web para una clínica ficticia que gestiona la información de médicos, pacientes y citas. El objetivo es integrar conceptos avanzados de JavaScript como la manipulación de datos JSON, la programación funcional, orientada a objetos y asincrónica, en un entorno práctico.

## Integrantes
- Felipe Pineda
- Marcelo Espinoza
- María Fernanda Avello
- Karina Hidalgo

## Características
- **Vista Principal:** Incluye sección de bienvenida, servicios, testimonios y pie de página.
- **Presentación del Equipo Médico:** Listado con información de los doctores.
- **Página de Contacto:** Formulario de contacto y mapa de la clínica.
- **Página de Administración:** Administración de citas, disponibilidad de médicos, etc.

## Requisitos
- Navegador web moderno (Google Chrome, Firefox, etc.).
- Acceso a Internet.


## Ejecución

1. Clona el repositorio:

```bash
git clone https://github.com/FernandaAvello/ABPro
```

2. Navega al directorio del proyecto:
3. Doble click en archivo `index.html`

## Fuente de datos

En el directorio `data` se encuentran los arhivos [doctos.json](/src/data/doctors.json), [doctorsNew.json](/src/data/doctorsNew.json) y [service.json](/src/data/service.json) los cuales contienen la información de los doctores y servicios para simular un despliegue dinámico en la página.

La información de los doctores está dividida en el equipo médico más antiguo y doctores que se están integrando. Cada ves que se requiere la lista de doctores, primero se junta la información de ambos archivos (merge) y luego se utiliza como cualquier arreglo.

Esta información es usada funcion [listarDoctoresAdmin( )](https://github.com/FernandaAvello/ABPro/blob/b5d79f7ff2c9ea3ca0dfb3a0a3ab20fda868d3eb/src/js/admin.js#L31), del script [admin.js](/src/js/admin.js) para mostrar los datos de los doctores en la tabla. Tambien se usa en el script [app.js](/src/js/app.js) ([línea 109](https://github.com/FernandaAvello/ABPro/blob/b5d79f7ff2c9ea3ca0dfb3a0a3ab20fda868d3eb/src/js/app.js#L109)) para crear las tarjetas del equipo médico del Hospital.

Por otra parte, la información de los servicios se utiliza únicamente en el script [showServices.js](/src/js/showServices.js) en la funcion [loadServices( )](https://github.com/FernandaAvello/ABPro/blob/b5d79f7ff2c9ea3ca0dfb3a0a3ab20fda868d3eb/src/js/showServices.js#L4), para cargar y mostrar en la página de inicio los servicios ofrecidos por el hospital.

## Programación Funcional Aplicada

En el archivo app.js se pueden visualizar las funciones y sus correspondientes ejemplos.

## Currying

La función calculateTotalCost usa currying para descomponer una función que toma dos argumentos (numberOfConsultations y pricePerConsultation) en una serie de funciones que toman un solo argumento. Primero toma numberOfConsultations y devuelve una función que toma pricePerConsultation, luego multiplica ambos valores para calcular el costo total.
```js
const calculateTotalCost = (numberOfConsultations) => (pricePerConsultation) => numberOfConsultations * pricePerConsultation;
```


## Funciones de flecha

La función calculateAverageWaitingTime que es una función de flecha, simplifica la sintaxis para calcular el tiempo promedio de espera de los pacientes. Toma totalWaitingTime y numberOfPatients como argumentos y devuelve el resultado de dividir el tiempo total de espera entre el número de pacientes.
const calculateAverageWaitingTime = (totalWaitingTime, numberOfPatients) => totalWaitingTime / numberOfPatients;


## Funciones recursivas

 La función calculateTotalConsultationHours calcula recursivamente el total de horas de consulta en una semana. Toma hoursPerDay y days como argumentos. Si days es 0, devuelve 0. De lo contrario, suma hoursPerDay al resultado de una llamada recursiva a sí misma con days - 1.
 const calculateTotalConsultationHours = (hoursPerDay, days) => (days === 0 ? 0 : hoursPerDay + calculateTotalConsultationHours(hoursPerDay, days - 1));

## Composición de funciones

La función applyDiscount es una función de orden superior que toma un discount y devuelve una función que toma cost y aplica el descuento. Por otro lado, la función, calculateDiscountedCost usa calculateTotalCost y applyDiscount para calcular el costo total con descuento. Primero calcula el costo total usando calculateTotalCost, luego aplica el descuento usando applyDiscount.
```js
const applyDiscount = (discount) => (cost) => cost - (cost * discount);
const calculateDiscountedCost = (numberOfConsultations, pricePerConsultation, discount) => applyDiscount(discount)(calculateTotalCost(numberOfConsultations)(pricePerConsultation));
```

En resumen, se demuestra cómo se pueden aplicar los conceptos de programación funcional para crear funciones más modulares, reutilizables y fáciles de mantener. La programación funcional se centra en el uso de funciones puras, la evitación de efectos secundarios y la composición de funciones para construir programas complejos a partir de funciones simples.

## Descripción de Eventos

En archivo contact.js podemos ver los eventos que se utilizaron en el formulario de contacto.
Evento tipo Submit, se dispara cuando se intenta enviar un formulario HTML. En este caso, se utiliza para manejar el envío del formulario de contacto.
Asociado a este utilicé event.preventDefault() para evitar que el formulario se envíe de la manera tradicional, permitiendo manejar el envío con JavaScript.

## Implementación de clases, herencia, encapsulación, y polimorfismo.

En el archivo app.js se implementan varios conceptos de la Programación Orientada a Objetos (POO).

Las clases en JavaScript se definen utilizando la palabra clave class. En el código, se define una clase Doctor y una subclase Cirujano.

La herencia permite crear una nueva clase que extiende una clase existente, heredando sus propiedades y métodos. En el código, la clase Cirujano hereda de la clase Doctor utilizando la palabra clave extends.

La encapsulación es el concepto de restringir el acceso directo a algunos componentes de un objeto. En el código, la propiedad \_years_of_experience está encapsulada y solo se puede acceder a ella a través del método getYearsOfExperience.

El polimorfismo permite que una subclase sobrescriba métodos de su clase padre para proporcionar una implementación específica. En el código, la subclase Cirujano sobrescribe el método totalPatients de la clase Doctor.

En resumen, el código demuestra cómo se pueden implementar clases, herencia, encapsulación y polimorfismo en JavaScript para crear estructuras de datos más organizadas y reutilizables.
