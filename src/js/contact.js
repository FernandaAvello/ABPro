const alertConfirmation = document.getElementById('alertConfirmation')
const appendAlert = (messageHeadline, messageText, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible mt-4" role="alert">`,
    `   <div>${messageHeadline}</div>`,
    `   <div>${messageText}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertConfirmation.append(wrapper)
}

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('formName').value;
    const email = document.getElementById('formEmail').value;
    const subject = document.getElementById('formSubject').value;
    const message = document.getElementById('formMessage').value;

    if (!name || !email || !subject || !message) {
      appendAlert('¡Ups! Parece que olvidaste completar alguno de los campos', 'Por favor, completa todos los campos del formulario', 'danger')
      return;
    }

    const data = {
      name,
      email,
      subject,
      message,
    };
    console.log('Nuevo mensaje de Contacto', data);
    const headText = `¡Gracias ${name} por contactarte con nosotros!`;
    const bodyText = `Hemos recibido tu mensaje y prontamente serás contactado al email ${email}`;
    appendAlert(headText, bodyText, 'success')
  });
});
