console.log("JS de formulario cargado correctamente");

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form-reserva');
    
    // Verificar que el formulario existe
    if (!form) {
        console.warn('Formulario no encontrado en esta página');
        return;
    }

    // Crear contenedor para mensajes si no existe
    let mensajeForm = document.querySelector('#mensaje-formulario');
    if (!mensajeForm) {
        mensajeForm = document.createElement('div');
        mensajeForm.id = 'mensaje-formulario';
        mensajeForm.style.display = 'none';
        mensajeForm.style.padding = '1rem';
        mensajeForm.style.borderRadius = '8px';
        mensajeForm.style.marginTop = '1rem';
        mensajeForm.style.textAlign = 'center';
        mensajeForm.style.fontWeight = 'bold';
        form.appendChild(mensajeForm);
    }

    // Función para crear elemento de error si no existe
    const crearMensajeError = (input) => {
        let errorElement = input.parentElement.querySelector('.error-mensaje');
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'error-mensaje';
            errorElement.style.color = '#d32f2f';
            errorElement.style.fontSize = '0.85rem';
            errorElement.style.marginTop = '0.25rem';
            errorElement.style.display = 'none';
            input.parentElement.appendChild(errorElement);
        }
        return errorElement;
    };

    // Utilidades mejoradas
    const mostrarError = (input, mensaje) => {
        const errorElement = crearMensajeError(input);
        input.style.borderColor = '#d32f2f';
        errorElement.textContent = mensaje;
        errorElement.style.display = 'block';
    };

    const limpiarError = (input) => {
        const errorElement = input.parentElement.querySelector('.error-mensaje');
        input.style.borderColor = '#e0e0e0';
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    };

    // Validaciones individuales
    const validarNombre = () => {
        const input = document.querySelector('#nombre');
        if (!input) return true;
        
        if (input.value.trim() === '') {
            mostrarError(input, 'El nombre es obligatorio');
            return false;
        }
        limpiarError(input);
        return true;
    };

    const validarApellido = () => {
        const input = document.querySelector('#apellido');
        if (!input) return true;
        
        if (input.value.trim() === '') {
            mostrarError(input, 'El apellido es obligatorio');
            return false;
        }
        limpiarError(input);
        return true;
    };

    const validarEmail = () => {
        const input = document.querySelector('#email');
        if (!input) return true;
        
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(input.value)) {
            mostrarError(input, 'Correo electrónico inválido');
            return false;
        }
        limpiarError(input);
        return true;
    };

    const validarTelefono = () => {
        const input = document.querySelector('#telefono');
        if (!input) return true;
        
        if (input.value.trim() !== '' && !/^\+?\d{6,15}$/.test(input.value.replace(/\s/g, ''))) {
            mostrarError(input, 'Teléfono inválido (6-15 dígitos)');
            return false;
        }
        limpiarError(input);
        return true;
    };

    const validarTour = () => {
        const input = document.querySelector('#tour');
        if (!input) return true;
        
        if (input.value === '') {
            mostrarError(input, 'Debes seleccionar un tour');
            return false;
        }
        limpiarError(input);
        return true;
    };

    const validarFecha = () => {
        const input = document.querySelector('#fecha');
        if (!input) return true;
        
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        const fechaSeleccionada = new Date(input.value + 'T00:00:00');
        
        if (input.value === '') {
            mostrarError(input, 'La fecha es obligatoria');
            return false;
        }
        
        if (fechaSeleccionada < hoy) {
            mostrarError(input, 'La fecha no puede ser anterior a hoy');
            return false;
        }
        
        limpiarError(input);
        return true;
    };

    const validarPersonas = () => {
        const input = document.querySelector('#personas');
        if (!input) return true;
        
        const valor = parseInt(input.value);
        if (isNaN(valor) || valor < 1 || valor > 20) {
            mostrarError(input, 'Debe ser entre 1 y 20 personas');
            return false;
        }
        limpiarError(input);
        return true;
    };

    // Eventos en tiempo real (solo si los elementos existen)
    const nombre = document.querySelector('#nombre');
    const apellido = document.querySelector('#apellido');
    const email = document.querySelector('#email');
    const telefono = document.querySelector('#telefono');
    const tour = document.querySelector('#tour');
    const fecha = document.querySelector('#fecha');
    const personas = document.querySelector('#personas');

    if (nombre) nombre.addEventListener('blur', validarNombre);
    if (apellido) apellido.addEventListener('blur', validarApellido);
    if (email) email.addEventListener('blur', validarEmail);
    if (telefono) telefono.addEventListener('blur', validarTelefono);
    if (tour) tour.addEventListener('change', validarTour);
    if (fecha) fecha.addEventListener('change', validarFecha);
    if (personas) personas.addEventListener('blur', validarPersonas);

    // Submit final
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        mensajeForm.style.display = 'none';

        // Validar todos los campos
        const valido = 
            validarNombre() &&
            validarApellido() &&
            validarEmail() &&
            validarTelefono() &&
            validarTour() &&
            validarFecha() &&
            validarPersonas();

        if (!valido) {
            mensajeForm.textContent = '⚠️ Por favor corrige los errores antes de continuar';
            mensajeForm.style.backgroundColor = '#ffebee';
            mensajeForm.style.color = '#d32f2f';
            mensajeForm.style.display = 'block';
            
            // Hacer scroll al primer error
            const primerError = form.querySelector('.error-mensaje[style*="block"]');
            if (primerError) {
                primerError.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // Mensaje de éxito
        mensajeForm.textContent = '✅ ¡Reserva enviada correctamente! Nos contactaremos contigo pronto.';
        mensajeForm.style.backgroundColor = '#e8f5e9';
        mensajeForm.style.color = '#2e7d32';
        mensajeForm.style.display = 'block';

        // Scroll al mensaje de éxito
        mensajeForm.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Resetear formulario después de 2 segundos
        setTimeout(() => {
            form.reset();
            mensajeForm.style.display = 'none';
        }, 3000);
    });

    console.log('✅ Validación de formulario inicializada');
});