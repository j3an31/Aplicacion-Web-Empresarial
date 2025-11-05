const enviar = (e) => {
  e.preventDefault(); // Evita el envío si hay errores

  const nombre = document.querySelector('#nombre');
  const apellido = document.querySelector('#apellido');
  const email = document.querySelector('#email');
  const telefono = document.querySelector('#telefono');
  const tour = document.querySelector('#tour');
  const fecha = document.querySelector('#fecha');
  const personas = document.querySelector('#personas');
  const mensaje = document.querySelector('#mensaje');

  // Validar nombre y apellido
  if (nombre.value.trim() === '' || apellido.value.trim() === '') {
    alert("Por favor, completa tus nombres y apellidos.");
    return;
  }

  // Validar correo electrónico con expresión regular
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email.value)) {
    alert("Por favor, ingresa un correo electrónico válido.");
    return;
  }

  // Validar teléfono (opcional, pero si lo llena, debe ser válido)
  if (telefono.value.trim() !== '' && !/^\+?\d{6,15}$/.test(telefono.value.trim())) {
    alert("Por favor, ingresa un número de teléfono válido (ej: +51999999999).");
    return;
  }

  // Validar selección del tour
  if (tour.value === '') {
    alert("Selecciona un tour antes de continuar.");
    return;
  }

  // Validar fecha (no vacía y no pasada)
  const hoy = new Date().toISOString().split("T")[0];
  if (fecha.value === '' || fecha.value < hoy) {
    alert("Selecciona una fecha válida para tu tour (no puede ser anterior a hoy).");
    return;
  }

  // Validar número de personas
  if (personas.value === '' || personas.value < 1 || personas.value > 20) {
    alert("El número de personas debe estar entre 1 y 20.");
    return;
  }

  // Si todo está correcto:
  alert("¡Formulario enviado correctamente!");
  document.querySelector('.form-reserva').reset(); // Limpia el formulario
};

// Escuchar el envío del formulario
document.querySelector('.form-reserva').addEventListener('submit', enviar);
