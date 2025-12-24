document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form-reserva');

    // Verificar que el formulario existe en la página
    if (!form) return;

    // Referencias a los campos
    const inputs = {
        nombre: document.getElementById('nombre'),
        apellido: document.getElementById('apellido'),
        email: document.getElementById('email'),
        telefono: document.getElementById('telefono'),
        tour: document.getElementById('tour'),
        movilidad: document.getElementById('movilidad'),
        fecha: document.getElementById('fecha'),
        personas: document.getElementById('personas')
    };

    // --- FUNCIONES DE UTILIDAD (Mostrar/Limpiar Errores) ---

    const mostrarError = (input, mensaje) => {
        const padre = input.parentElement;
        let errorSpan = padre.querySelector('.error-mensaje');
        
        // Si no existe el span de error, lo creamos
        if (!errorSpan) {
            errorSpan = document.createElement('span');
            errorSpan.className = 'error-mensaje';
            errorSpan.style.color = '#d32f2f';
            errorSpan.style.fontSize = '0.85rem';
            errorSpan.style.display = 'block';
            errorSpan.style.marginTop = '5px';
            padre.appendChild(errorSpan);
        }

        input.style.borderColor = '#d32f2f';
        input.style.backgroundColor = '#fff5f5';
        errorSpan.textContent = mensaje;
    };

    const limpiarError = (input) => {
        const padre = input.parentElement;
        const errorSpan = padre.querySelector('.error-mensaje');
        
        input.style.borderColor = '#ccc'; // O el color original de tu CSS
        input.style.backgroundColor = '#fff';
        
        if (errorSpan) {
            errorSpan.remove();
        }
    };

    // --- VALIDACIONES ESPECÍFICAS ---

    const validarTexto = (input) => {
        if (input.value.trim().length < 2) {
            mostrarError(input, 'Este campo es obligatorio (mín. 2 letras).');
            return false;
        }
        limpiarError(input);
        return true;
    };

    const validarEmail = (input) => {
        // Regex estándar para emails
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(input.value.trim())) {
            mostrarError(input, 'Ingresa un correo electrónico válido.');
            return false;
        }
        limpiarError(input);
        return true;
    };

    const validarTelefono = (input) => {
        // Acepta números, espacios y símbolo + (mínimo 7 dígitos)
        const regex = /^[\d\s+]{7,15}$/;
        if (input.value.trim() !== '' && !regex.test(input.value.trim())) {
            mostrarError(input, 'Número inválido (mín. 7 dígitos).');
            return false;
        }
        limpiarError(input);
        return true;
    };

    const validarSelect = (input) => {
        if (input.value === "") {
            mostrarError(input, 'Por favor, selecciona una opción.');
            return false;
        }
        limpiarError(input);
        return true;
    };

    const validarFecha = (input) => {
        if (!input.value) {
            mostrarError(input, 'Selecciona una fecha.');
            return false;
        }
        
        const fechaSeleccionada = new Date(input.value);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        if (fechaSeleccionada < hoy) {
            mostrarError(input, 'La fecha no puede ser en el pasado.');
            return false;
        }
        limpiarError(input);
        return true;
    };

    // --- VALIDACIÓN CAPACIDAD DEL VEHÍCULO ---
    const validarCapacidadVehiculo = () => {
        const inputPersonas = inputs.personas;
        const inputMovilidad = inputs.movilidad;
        
        // Si no hay movilidad seleccionada o personas vacías, no validamos logica compleja aún
        if (inputMovilidad.value === "" || inputPersonas.value === "") {
            // Validamos solo que personas no esté vacío
            if(inputPersonas.value === "") return false;
            return true;
        }

        const numPersonas = parseInt(inputPersonas.value);
        const opcionSeleccionada = inputMovilidad.options[inputMovilidad.selectedIndex];
        // Obtenemos el data-max del HTML 
        const maxCapacidad = parseInt(opcionSeleccionada.getAttribute('data-max'));

        // Validar rango básico
        if (isNaN(numPersonas) || numPersonas < 1) {
            mostrarError(inputPersonas, 'Mínimo 1 persona.');
            return false;
        }

        // Validar contra la capacidad del auto
        if (maxCapacidad && numPersonas > maxCapacidad) {
            mostrarError(inputPersonas, `El vehículo seleccionado solo acepta ${maxCapacidad} pasajeros.`);
            // También marcamos la movilidad para que el usuario sepa qué cambiar
            mostrarError(inputMovilidad, 'Capacidad insuficiente para el grupo.');
            return false;
        }

        // Todo correcto
        limpiarError(inputPersonas);
        limpiarError(inputMovilidad); // Limpiamos ambos por si acaso
        return true;
    };

    // --- 3. LISTENERS PARA FEEDBACK EN TIEMPO REAL ---
    
    inputs.nombre.addEventListener('blur', () => validarTexto(inputs.nombre));
    inputs.apellido.addEventListener('blur', () => validarTexto(inputs.apellido));
    inputs.email.addEventListener('blur', () => validarEmail(inputs.email));
    inputs.telefono.addEventListener('blur', () => validarTelefono(inputs.telefono));
    inputs.tour.addEventListener('change', () => validarSelect(inputs.tour));
    inputs.fecha.addEventListener('change', () => validarFecha(inputs.fecha));
    
    // Validar capacidad cuando cambia el vehículo O cuando cambia el número de personas
    inputs.movilidad.addEventListener('change', validarCapacidadVehiculo);
    inputs.personas.addEventListener('input', validarCapacidadVehiculo);

    // --- ENVÍO DEL FORMULARIO (SUBMIT) ---

    form.addEventListener('submit', function(e) {
        // Prevenir el envío automático para validar
        e.preventDefault();

        // Ejecutar todas las validaciones
        const vNombre = validarTexto(inputs.nombre);
        const vApellido = validarTexto(inputs.apellido);
        const vEmail = validarEmail(inputs.email);
        const vTelefono = validarTelefono(inputs.telefono);
        const vTour = validarSelect(inputs.tour);
        const vMovilidad = validarSelect(inputs.movilidad);
        const vFecha = validarFecha(inputs.fecha);
        const vCapacidad = validarCapacidadVehiculo();

        // Verificar si TODO es válido
        if (vNombre && vApellido && vEmail && vTelefono && vTour && vMovilidad && vFecha && vCapacidad) {
            
            // OPCIONAL: Mostrar un indicador de carga
            const btnSubmit = form.querySelector('button[type="submit"]');
            btnSubmit.textContent = 'Enviando...';
            btnSubmit.disabled = true;

            console.log('Formulario válido. Enviando POST al backend');
            
            form.submit(); 
            alert("Formulario enviado Exitosamente");

        } else {
            // Si hay errores, hacemos scroll al primer error
            const primerError = document.querySelector('.error-mensaje');
            if (primerError) {
                primerError.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            console.warn('Formulario inválido, corrige los errores.');
        }
    });

    console.log('JS de validación de reserva cargado.');
});