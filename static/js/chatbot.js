// Función para abrir/cerrar el chat
function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    const chatButton = document.getElementById('chatbotButton');
    
    chatWindow.classList.toggle('active');
    
    // Mostrar/ocultar el botón flotante
    if (chatWindow.classList.contains('active')) {
        chatButton.style.display = 'none';
    } else {
        chatButton.style.display = 'flex';
    }
}

// Función para enviar mensaje
function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    
    if (message === '') return;
    
    // Agregar mensaje del usuario
    addMessage(message, 'user');
    input.value = '';
    
    // Mostrar indicador de escritura
    showTypingIndicator();
    
    // Simular respuesta del bot después de un delay
    setTimeout(() => {
        hideTypingIndicator();
        const botResponse = getBotResponse(message);
        addMessage(botResponse, 'bot');
    }, 800);
}

// Mostrar indicador de escritura
function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator active';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    messagesContainer.appendChild(typingDiv);
    scrollToBottom();
}

// Ocultar indicador de escritura
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Función para agregar mensajes al chat
function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.textContent = text;
    messagesContainer.appendChild(messageDiv);
    scrollToBottom();
}

// Función para scroll automático
function scrollToBottom() {
    const messagesContainer = document.getElementById('chatMessages');
    setTimeout(() => {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 100);
}

// Función para manejar Enter
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Función para obtener respuestas del bot
function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Respuestas sobre destinos
    if (lowerMessage.includes('colca') || lowerMessage.includes('cañon') || lowerMessage.includes('canon')) {
        return '🦅 El Cañón del Colca es uno de los más profundos del mundo con 3,400 metros. Puedes observar el majestuoso vuelo del cóndor andino. ¿Te gustaría más información sobre este tour?';
    }
    
    if (lowerMessage.includes('sillar')) {
        return '🏔️ La Ruta del Sillar te muestra las canteras de piedra volcánica blanca que construyeron la "Ciudad Blanca". Incluye el Valle de Culebrillas. ¡Una experiencia única de 4 horas!';
    }
    
    if (lowerMessage.includes('pillones') || lowerMessage.includes('cataratas') || lowerMessage.includes('cascada')) {
        return '💧 Las Cataratas de Pillones son un espectáculo natural impresionante con 3 caídas de agua. Perfectas para los amantes de la naturaleza y la fotografía.';
    }
    
    if (lowerMessage.includes('salinas') || lowerMessage.includes('laguna')) {
        return '🦩 La Laguna de Salinas es hogar de flamencos rosados y vicuñas. Un paisaje andino espectacular a 4,300 msnm. Tour de día completo.';
    }
    
    if (lowerMessage.includes('campiña') || lowerMessage.includes('bus')) {
        return '🚌 El Tour Bus Campiña te lleva por los hermosos paisajes rurales de Arequipa, visitando tradicionales picanterías donde degustarás comida típica.';
    }
    
    if (lowerMessage.includes('destino') || lowerMessage.includes('tour') || lowerMessage.includes('lugar')) {
        return '📍 Tenemos 5 destinos principales:\n🦅 Cañón del Colca\n🏔️ Ruta del Sillar\n💧 Cataratas de Pillones\n🦩 Laguna de Salinas\n🚌 Bus Campiña\n\n¿Cuál te interesa?';
    }
    
    // Respuestas sobre precios
    if (lowerMessage.includes('precio') || lowerMessage.includes('costo') || lowerMessage.includes('cuanto') || lowerMessage.includes('cuánto')) {
        return '💰 Los precios varían según el destino y la temporada:\n• Colca: S/. 150-200\n• Sillar: S/. 80-100\n• Pillones: S/. 100-120\n\nLlámanos al +51 123 456 789 para cotizaciones exactas.';
    }
    
    // Respuestas sobre reservas
    if (lowerMessage.includes('reserva') || lowerMessage.includes('reservar') || lowerMessage.includes('booking') || lowerMessage.includes('agendar')) {
        return '📅 Para reservar:\n✅ Llámanos: +51 123 456 789\n✅ Visita nuestra sección Contacto\n✅ Escríbenos por WhatsApp\n\n¿Qué destino te interesa reservar?';
    }
    
    // Respuestas sobre horarios
    if (lowerMessage.includes('horario') || lowerMessage.includes('hora') || lowerMessage.includes('tiempo') || lowerMessage.includes('duración') || lowerMessage.includes('duracion')) {
        return '⏰ Horarios típicos:\n• Colca: Salida 3:00 AM - Retorno 6:00 PM\n• Sillar: 9:00 AM - 1:00 PM\n• Pillones: 8:00 AM - 5:00 PM\n\n¿Qué tour te interesa?';
    }
    
    // Respuestas sobre transporte
    if (lowerMessage.includes('transporte') || lowerMessage.includes('vehiculo') || lowerMessage.includes('vehículo')) {
        return '🚐 Contamos con:\n✅ Minibuses modernos\n✅ Buses turísticos\n✅ Vehículos 4x4 para rutas difíciles\n\nTodos con seguro y conductores experimentados.';
    }
    
    // Respuestas sobre clima
    if (lowerMessage.includes('clima') || lowerMessage.includes('temperatura') || lowerMessage.includes('ropa') || lowerMessage.includes('llevar')) {
        return '☀️ Clima de Arequipa:\n🌡️ Día: 20-23°C (soleado)\n🌙 Noche: 8-10°C (frío)\n\n📦 Te recomiendo llevar:\n• Protector solar\n• Gorra/sombrero\n• Casaca ligera\n• Agua';
    }
    
    // Respuestas sobre comida
    if (lowerMessage.includes('comida') || lowerMessage.includes('restaurante') || lowerMessage.includes('comer') || lowerMessage.includes('gastronomía') || lowerMessage.includes('gastronomia')) {
        return '🍽️ ¡Arequipa es capital gastronómica!\nPrueba:\n• Rocoto relleno\n• Ocopa arequipeña\n• Chupe de camarones\n• Adobo arequipeño\n\nAlgunos tours incluyen almuerzo típico.';
    }
    
    // Respuestas sobre altitud/altura
    if (lowerMessage.includes('altura') || lowerMessage.includes('altitud') || lowerMessage.includes('soroche') || lowerMessage.includes('mal de altura')) {
        return '⛰️ Sobre la altitud:\n• Arequipa: 2,335 msnm\n• Colca: hasta 4,910 msnm\n• Salinas: 4,300 msnm\n\n💊 Recomendaciones:\n• Bebe mucha agua\n• Té de coca\n• Descansa al llegar\n• Evita alcohol el primer día';
    }
    
    // Respuestas de ayuda
    if (lowerMessage.includes('ayuda') || lowerMessage.includes('help') || lowerMessage.includes('info') || lowerMessage.includes('información') || lowerMessage.includes('informacion')) {
        return '🤝 Puedo ayudarte con:\n📍 Destinos turísticos\n💰 Precios y ofertas\n📅 Reservas\n⏰ Horarios\n🚐 Transporte\n☀️ Clima y qué llevar\n🍽️ Gastronomía\n\n¿Qué necesitas saber?';
    }
    
    // Saludos
    if (lowerMessage.includes('hola') || lowerMessage.includes('buenos') || lowerMessage.includes('buenas') || lowerMessage.includes('hey') || lowerMessage.includes('hi')) {
        return '¡Hola! 👋 Bienvenido a MistiTours, tu mejor opción para conocer Arequipa.\n\n¿En qué puedo ayudarte hoy?\n\n💡 Puedes preguntarme sobre destinos, precios, reservas o recomendaciones.';
    }
    
    // Despedidas
    if (lowerMessage.includes('adios') || lowerMessage.includes('chau') || lowerMessage.includes('hasta luego') || lowerMessage.includes('bye')) {
        return '¡Hasta pronto! 👋 Gracias por contactar a MistiTours. ¡Esperamos verte en Arequipa! 🏔️';
    }
    
    if (lowerMessage.includes('gracias') || lowerMessage.includes('thanks')) {
        return '¡De nada! 😊 Es un placer ayudarte. Si tienes más preguntas, aquí estoy. ¡Buen viaje!';
    }
    
    // Respuesta por defecto
    return '🤔 Interesante pregunta. Te puedo ayudar con:\n\n📍 Destinos turísticos\n💰 Precios y reservas\n⏰ Horarios y duración\n🚐 Transporte\n☀️ Clima y qué llevar\n🍽️ Gastronomía\n\n¿Qué te gustaría saber específicamente?';
}

// Inicialización cuando se carga la página
window.addEventListener('load', () => {
    console.log('✅ Chatbot MistiTours listo y visible!');
    
    // Inicializar el estado del botón flotante
    const chatWindow = document.getElementById('chatWindow');
    const chatButton = document.getElementById('chatbotButton');
    
    // Si el chat está activo, ocultar el botón
    if (chatWindow && chatWindow.classList.contains('active')) {
        if (chatButton) chatButton.style.display = 'none';
    } else {
        // Si el chat está cerrado, mostrar el botón
        if (chatButton) chatButton.style.display = 'flex';
    }
    
    // Opcional: Mostrar mensaje de bienvenida después de 2 segundos
    setTimeout(() => {
        addMessage('¿Tienes alguna pregunta sobre nuestros tours? ¡Estoy aquí para ayudarte! 😊', 'bot');
    }, 2000);
});