// Carrusel de Destinos
document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".carrusel-slide");
    const indicadores = document.querySelectorAll(".indicador");
    const btnAnterior = document.getElementById("btnAnterior");
    const btnSiguiente = document.getElementById("btnSiguiente");
    
    let slideActual = 0;
    const totalSlides = slides.length;

    // Función para mostrar slide
    function mostrarSlide(n) {
        // Ocultar todos los slides
        slides.forEach(slide => {
            slide.classList.remove("active");
        });
        
        // Desactivar todos los indicadores
        indicadores.forEach(ind => {
            ind.classList.remove("active");
        });
        
        // Ajustar índice si está fuera de rango
        if (n >= totalSlides) {
            slideActual = 0;
        } else if (n < 0) {
            slideActual = totalSlides - 1;
        } else {
            slideActual = n;
        }
        
        // Mostrar slide actual
        slides[slideActual].classList.add("active");
        indicadores[slideActual].classList.add("active");
        
        // Scroll suave al inicio del carrusel
        document.querySelector(".carrusel-container").scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    }

    // Botón siguiente
    btnSiguiente.addEventListener("click", function() {
        mostrarSlide(slideActual + 1);
    });

    // Botón anterior
    btnAnterior.addEventListener("click", function() {
        mostrarSlide(slideActual - 1);
    });

    // Click en indicadores
    indicadores.forEach((indicador, index) => {
        indicador.addEventListener("click", function() {
            mostrarSlide(index);
        });
    });

    // Navegación con teclado
    document.addEventListener("keydown", function(e) {
        if (e.key === "ArrowLeft") {
            mostrarSlide(slideActual - 1);
        } else if (e.key === "ArrowRight") {
            mostrarSlide(slideActual + 1);
        }
    });
});