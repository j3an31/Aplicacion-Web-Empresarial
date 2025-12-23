document.addEventListener('DOMContentLoaded', () => {
    
    // Seleccionar todos los botones de "Ver Detalle"
    const botonesDetalle = document.querySelectorAll('.btn-ver-detalle');
    
    // Seleccionar todos los botones de cerrar (X)
    const botonesCerrar = document.querySelectorAll('.close-modal');

    // Función para ABRIR modal
    botonesDetalle.forEach(boton => {
        boton.addEventListener('click', () => {
            const modalId = boton.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if(modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Evita scroll atrás
            }
        });
    });

    // Función para CERRAR modal (Click en la X)
    botonesCerrar.forEach(boton => {
        boton.addEventListener('click', () => {
            const modal = boton.closest('.modal');
            cerrarModal(modal);
        });
    });

    // Función para CERRAR modal (Click fuera del contenido)
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            cerrarModal(e.target);
        }
    });

    // Función auxiliar para cerrar
    function cerrarModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Reactiva el scroll
    }

    // --- NUEVO: DETECTAR PARÁMETRO URL PARA AUTO-ABRIR MODAL ---
    
    // 1. Leer la URL actual (ej: ...destinos.html?tour=modal-colca)
    const urlParams = new URLSearchParams(window.location.search);
    const tourId = urlParams.get('tour'); // Obtiene "modal-colca"

    // 2. Si existe un ID en la URL...
    if (tourId) {
        const modalApertura = document.getElementById(tourId);
        
        // 3. Verificamos que el modal realmente exista en el HTML
        if (modalApertura) {
            modalApertura.classList.add('active');
            document.body.style.overflow = 'hidden'; // Bloquear scroll
            
            // Opcional: Hacer scroll suave hacia la sección de la grid
            document.querySelector('.grid-section').scrollIntoView({ 
                behavior: 'smooth' 
            });
        }
    }
});