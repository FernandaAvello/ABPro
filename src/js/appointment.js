// Implementación Pila
class Stack { // LIFO
    constructor() { // Constructor de la clase
        this.citas = []; // Inicializa la pila como un arreglo vacío
    }

    push(nuevaCita) { // Método para agregar un elemento a la pila
        this.citas.push(nuevaCita);
    }

    pop() { // Método para eliminar el último elemento de la pila
        if (this.isEmpty()) {
            return "No hay citas agendadas";
        }
        return this.citas.pop();
    }

    peek() { // Método para ver el último elemento de la pila
        return this.citas[this.citas.length - 1];
    }

    isEmpty() { // Método para verificar si la pila está vacía
        return this.citas.length === 0;
    }
}

// Implementación Cola
class Queue { // FIFO
    constructor() { // Constructor de la clase
        this.citas = [];
    }

    enqueue(nuevaCita) { // Método para agregar un elemento a la cola
        this.citas.push(nuevaCita);
    }

    dequeue() { // Método para eliminar el primer elemento de la cola
        if (this.isEmpty()) {
            return "No hay pacientes en la cola";
        }
        return this.citas.shift();
    }

    isEmpty() { // Método para verificar si la cola está vacía
        return this.citas.length === 0;
    }
}

const paciente1 = {
    nombre: "Juanita",
    id: 1
};

const paciente2 = {
    nombre: "Pepe",
    id: 2
};

const paciente3 = {
    nombre: "Ana",
    id: 3
};


const citasClinicas = new Stack(); // Creo una pila de citas vacía.
//llega Juanita a solicitar cita con el ID 1
citasClinicas.push(paciente1);
console.log(citasClinicas.peek().nombre, "cita agendada");
//llega Pepe a solicitar cita con el ID 2
citasClinicas.push(paciente2);
console.log(citasClinicas.peek().nombre, "cita agendada");
//llega Ana a solicitar cita con el ID 3
citasClinicas.push(paciente3);
console.log(citasClinicas.peek().nombre, "cita agendada");

console.log("Citas Agendadas", citasClinicas);


const ordenLlegadaPacientes = new Queue(); // Creo una cola de orden de llegada de pacientes vacía.
// Saco a todos los pacientes de la pila y los pongo en la cola
while (!citasClinicas.isEmpty()) {
    ordenLlegadaPacientes.enqueue(citasClinicas.pop());
}
console.log("Pacientes en la cola", ordenLlegadaPacientes);
// Atiendo a los pacientes en el orden de llegada
while (!ordenLlegadaPacientes.isEmpty()) {
    console.log("Atendiendo a paciente", ordenLlegadaPacientes.dequeue().nombre);
}
