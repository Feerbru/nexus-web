/* 
  NEXUS Learning Hub - Validación de Formulario
*/

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('nexus-contact-form');

  if (!contactForm) return;

  const nameInput = document.getElementById('nombre');
  const emailInput = document.getElementById('correo');
  const messageInput = document.getElementById('mensaje');
  const alertContainer = document.getElementById('alert-message');

  // Validar al enviar el formulario
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenir el envío por defecto del navegador

    let isValid = true;
    let errorMessages = [];

    // Validar Nombre
    if (nameInput.value.trim().length < 3) {
      isValid = false;
      markInvalid(nameInput, 'El nombre debe tener al menos 3 caracteres.');
    } else {
      markValid(nameInput);
    }

    // Validar Correo Electrónico con regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailInput.value.trim())) {
      isValid = false;
      markInvalid(emailInput, 'Por favor, ingresa un correo electrónico válido.');
    } else {
      markValid(emailInput);
    }

    // Validar Mensaje
    if (messageInput.value.trim().length < 10) {
      isValid = false;
      markInvalid(messageInput, 'El mensaje debe tener al menos 10 caracteres.');
    } else {
      markValid(messageInput);
    }

    // Mostrar alerta de resultado
    if (isValid) {
      showAlert(alertContainer, '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.', 'success');
      contactForm.reset();
      // Limpiar clases de validación
      [nameInput, emailInput, messageInput].forEach(input => input.classList.remove('is-valid'));
    } else {
      showAlert(alertContainer, 'Por favor, corrige los errores en el formulario antes de enviar.', 'danger');
    }
  });

  // Validación
  [nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener('input', () => {
      if (input.classList.contains('is-invalid')) {
        validateField(input);
      }
    });
  });

  function validateField(input) {
    if (input.id === 'nombre') {
      if (input.value.trim().length >= 3) markValid(input);
    } else if (input.id === 'correo') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(input.value.trim())) markValid(input);
    } else if (input.id === 'mensaje') {
      if (input.value.trim().length >= 10) markValid(input);
    }
  }

  function markInvalid(input, message) {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    const feedback = input.nextElementSibling;
    if (feedback && feedback.classList.contains('invalid-feedback')) {
      feedback.textContent = message;
    }
  }

  function markValid(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
  }

  function showAlert(container, text, type) {
    if (!container) return;
    container.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show shadow-sm" role="alert">
        <i class="bi bi-${type === 'success' ? 'check-circle-fill' : 'exclamation-triangle-fill'} me-2"></i>
        ${text}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
  }
});
