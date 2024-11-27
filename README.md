# Proyecto Clínica

## Descripción
Este proyecto para una página web para una clínica ficticia.

## Características
- Vista Principal (Incluye sección de bienvenida, servicios, testimonios, pie de página)
- Presentación de Equipo Médico , listado.
- Página de Contacto (incluye formulario de contacto, mapa de la clínica)
- Página de Administración

## Requisitos
- Navegador Web.

## Ejecución
1. Clona el repositorio:
  ```bash
  git clone https://github.com/FernandaAvello/Laboratorio 2.git
  ```
2. Navega al directorio del proyecto:
3. Doble click en archivo `index.html`

## Programación Funcional Aplicada
En el archivo app.js se pueden visualizar las funciones y sus correspondientes ejemplos.

## Currying
La función calculateTotalCost usa currying para descomponer una función que toma dos argumentos (numberOfConsultations y pricePerConsultation) en una serie de funciones que toman un solo argumento. Primero toma numberOfConsultations y devuelve una función que toma pricePerConsultation. Luego, multiplica ambos valores para calcular el costo total.

## Funciones de flecha
La función calculateAverageWaitingTime que es una función de flecha, simplifica la sintaxis para calcular el tiempo promedio de espera de los pacientes. Toma totalWaitingTime y numberOfPatients como argumentos y devuelve el resultado de dividir el tiempo total de espera entre el número de pacientes.

## Funciones recursivas
 La función calculateTotalConsultationHours calcula recursivamente el total de horas de consulta en una semana. Toma hoursPerDay y days como argumentos. Si days es 0, devuelve 0. De lo contrario, suma hoursPerDay al resultado de una llamada recursiva a sí misma con days - 1.

## Composición de funciones
La función applyDiscount es una función de orden superior que toma un discount y devuelve una función que toma cost y aplica el descuento. Por otro lado, la función, calculateDiscountedCost usa calculateTotalCost y applyDiscount para calcular el costo total con descuento. Primero calcula el costo total usando calculateTotalCost, luego aplica el descuento usando applyDiscount.

En resumen, se demuestra cómo se pueden aplicar los conceptos de programación funcional para crear funciones más modulares, reutilizables y fáciles de mantener. La programación funcional se centra en el uso de funciones puras, la evitación de efectos secundarios y la composición de funciones para construir programas complejos a partir de funciones simples.


## Descripción de Eventos
En archivo contact.js podemos ver los eventos que se utilizaron en el formulario de contacto.
Evento tipo Submit, se dispara cuando se intenta enviar un formulario HTML. En este caso, se utiliza para manejar el envío del formulario de contacto.
Asociado a este utilicé event.preventDefault() para evitar que el formulario se envíe de la manera tradicional, permitiendo manejar el envío con JavaScript.

## Implementación de clases, herencia, encapsulación, y polimorfismo.
En el archivo app.js se implementan varios conceptos de la Programación Orientada a Objetos (POO).

Las clases en JavaScript se definen utilizando la palabra clave class. En el código, se define una clase Doctor y una subclase Cirujano.

La herencia permite crear una nueva clase que extiende una clase existente, heredando sus propiedades y métodos. En el código, la clase Cirujano hereda de la clase Doctor utilizando la palabra clave extends.

La encapsulación es el concepto de restringir el acceso directo a algunos componentes de un objeto. En el código, la propiedad _years_of_experience está encapsulada y solo se puede acceder a ella a través del método getYearsOfExperience.

El polimorfismo permite que una subclase sobrescriba métodos de su clase padre para proporcionar una implementación específica. En el código, la subclase Cirujano sobrescribe el método totalPatients de la clase Doctor.

En resumen, el código demuestra cómo se pueden implementar clases, herencia, encapsulación y polimorfismo en JavaScript para crear estructuras de datos más organizadas y reutilizables.





