/* ==========================================
   LÓGICA DEL CHATBOT - MISTITOURS
   ========================================== */

// --- 1. CONFIGURACIÓN VISUAL (Abrir/Cerrar) ---
function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    const chatButton = document.getElementById('chatbotButton');
    
    chatWindow.classList.toggle('active');
    
    if (chatWindow.classList.contains('active')) {
        chatButton.style.display = 'none';
        setTimeout(() => document.getElementById('userInput').focus(), 300);
    } else {
        chatButton.style.display = 'flex';
    }
}

// --- 2. ENVÍO DE MENSAJES ---
function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    
    if (message === '') return;
    
    // 1. Mensaje del usuario
    addMessage(message, 'user');
    input.value = '';
    
    // 2. Indicador de escritura
    showTypingIndicator();
    
    // 3. Respuesta del Bot
    setTimeout(() => {
        hideTypingIndicator();
        const botResponse = getBotResponse(message);
        addMessage(botResponse, 'bot');
    }, 700);
}

function handleKeyPress(event) {
    if (event.key === 'Enter') sendMessage();
}

// --- 3. MANEJO DEL DOM (Agregar HTML al chat) ---
function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    // IMPORTANTE: innerHTML permite formato rico (negritas, listas)
    messageDiv.innerHTML = text; 
    
    messagesContainer.appendChild(messageDiv);
    scrollToBottom();
}

function scrollToBottom() {
    const container = document.getElementById('chatMessages');
    setTimeout(() => container.scrollTop = container.scrollHeight, 100);
}

// Indicadores visuales
function showTypingIndicator() {
    const container = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator active';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    container.appendChild(typingDiv);
    scrollToBottom();
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
}

/* ==========================================
   🧠 CEREBRO DEL BOT (Inteligencia)
   ========================================== */
function getBotResponse(input) {
    const text = input.toLowerCase().trim();

    // --- HELPER: Plantilla de Tarjeta de Tour ---
    const tourCard = (emoji, titulo, precio, tiempo, incluye) => {
        return `
            <div class="bot-card">
                <strong>${emoji} ${titulo}</strong><br>
                <span class="bot-price">💰 S/ ${precio}</span> | ⏱️ ${tiempo}<br>
                <div class="bot-details">✨ <em>Incluye:</em> ${incluye}</div>
            </div>
        `;
    };

    // ---------------------------------------------
    // BLOQUE 1: LISTADO GENERAL DE SERVICIOS (Nuevo)
    // ---------------------------------------------
    if (text.includes('destinos') || text.includes('tours') || text.includes('lugares') || text.includes('viajes') || text.includes('servicios')) {
        return `
            <strong>🗺️ Explora Arequipa con Nosotros</strong><br>
            Tenemos estas aventuras disponibles para ti:<br><br>
            <ul class="bot-list">
                <li>🦅 <strong>Colca:</strong> Cañón, cóndores y cultura.</li>
                <li>🏔️ <strong>Sillar:</strong> Canteras blancas y arte.</li>
                <li>🌊 <strong>Rafting:</strong> Adrenalina en el río Chili.</li>
                <li>🌋 <strong>Misti:</strong> Reto de alta montaña (2 días).</li>
                <li>🦩 <strong>Salinas:</strong> Espejos de agua y salar.</li>
                <li>💧 <strong>Pillones:</strong> Cataratas y piedras.</li>
                <li>🚌 <strong>Campiña:</strong> Tour panorámico relajado.</li>
                <li>🦕 <strong>Toro Muerto:</strong> Historia y petroglifos.</li>
            </ul>
            <em>💬 Escribe el nombre de un lugar para ver detalles.</em>
        `;
    }

    // ---------------------------------------------
    // BLOQUE 2: TOURS ESPECÍFICOS
    // ---------------------------------------------
    if (text.includes('colca') || text.includes('cañon')) 
        return tourCard('🦅', 'Cañón del Colca (Full Day)', '60.00', '14h', 'Mirador Cruz del Cóndor, Chivay, aguas termales.');

    if (text.includes('sillar') || text.includes('cantera')) 
        return tourCard('🏔️', 'Ruta del Sillar', '35.00', '4h', 'Canteras de Añashuayco, tallado en vivo y Culebrillas.');

    if (text.includes('pillones') || text.includes('catarata')) 
        return tourCard('💧', 'Catarata de Pillones', '70.00', '9h', 'Caminata entre rocas volcánicas, cascadas e Imata.');

    if (text.includes('salinas') || text.includes('laguna')) 
        return tourCard('🦩', 'Laguna de Salinas', '55.00', '8h', 'Avistamiento de flamencos, salar y volcanes.');

    if (text.includes('campiña') || text.includes('mirabus')) 
        return tourCard('🚌', 'Tour Campiña', '40.00', '4h', 'Miradores de Yanahuara, Carmen Alto y Molino de Sabandía.');

    if (text.includes('rafting') || text.includes('chili')) 
        return tourCard('🌊', 'Rafting Río Chili', '65.00', '3h', 'Rápidos (Clase II, III, IV), equipo completo y guía.');

    if (text.includes('misti') || text.includes('ascenso')) 
        return tourCard('🌋', 'Ascenso al Misti', '250.00', '2 Días', 'Transporte 4x4, equipo de camping y alimentación.');

    if (text.includes('toro') || text.includes('muerto')) 
        return tourCard('🦕', 'Toro Muerto', '90.00', 'Full Day', 'Petroglifos milenarios, huellas de dinosaurio y gastronomía.');

    // ---------------------------------------------
    // BLOQUE 3: INFO COMERCIAL Y UTILITARIA (Mejoras)
    // ---------------------------------------------
    
    // 💰 PRECIOS (Resumen)
    if (text.includes('precio') || text.includes('costo') || text.includes('cuanto') || text.includes('tarifas')) {
        return `
            <strong>💰 Tarifario Oficial 2025</strong><br>
            <ul class="bot-list">
                <li>Sillar: <strong>S/ 35</strong></li>
                <li>Campiña: <strong>S/ 40</strong></li>
                <li>Salinas: <strong>S/ 55</strong></li>
                <li>Colca: <strong>S/ 60</strong></li>
                <li>Rafting: <strong>S/ 65</strong></li>
                <li>Pillones: <strong>S/ 70</strong></li>
                <li>Misti: <strong>S/ 250</strong></li>
            </ul>
        `;
    }

    // 💳 MÉTODOS DE PAGO (Nuevo - Vital para ventas)
    if (text.includes('pago') || text.includes('pagar') || text.includes('yape') || text.includes('tarjeta') || text.includes('banco')) {
        return `
            <strong>💳 Métodos de Pago Aceptados</strong><br>
            Para confirmar tu reserva puedes usar:<br>
            <ul class="bot-list">
                <li>📱 <strong>Yape / Plin:</strong> (+51 999 999 999)</li>
                <li>🏦 <strong>Transferencia:</strong> BCP / Interbank</li>
                <li>💵 <strong>Efectivo:</strong> Soles o Dólares</li>
                <li>💳 <strong>Tarjetas:</strong> Visa/Mastercard (+5% comisión)</li>
            </ul>
            <em>Se requiere el 50% de adelanto para reservar.</em>
        `;
    }

    // 🚐 TRANSPORTE PRIVADO
    if (text.includes('transporte') || text.includes('carro') || text.includes('alquiler') || text.includes('movilidad')) {
        return `
            <strong>🚐 Alquiler de Movilidad Privada</strong><br>
            Ideal para traslados al aeropuerto o tours privados:<br>
            <ul class="bot-list">
                <li>🚗 Sedán (1-3 pax)</li>
                <li>🚙 SUV 4x4 (1-4 pax)</li>
                <li>🚐 Minivan (5-10 pax)</li>
                <li>🚌 Sprinter (15-19 pax)</li>
            </ul>
        `;
    }

    // ⏰ HORARIOS DE ATENCIÓN (Nuevo)
    if (text.includes('horario') || text.includes('hora') || text.includes('abierto') || text.includes('oficina')) {
        return `
            <strong>🕒 Horarios de Atención</strong><br>
            <ul>
                <li><strong>Oficina:</strong> Lun-Sáb 8:00am - 7:00pm</li>
                <li><strong>WhatsApp:</strong> 24/7 (Respondemos lo antes posible)</li>
                <li><strong>Salidas Tours:</strong> De 4:00am a 9:00am (según destino)</li>
            </ul>
        `;
    }

    // 🌤️ CLIMA Y ROPA
    if (text.includes('clima') || text.includes('ropa') || text.includes('llevar')) {
        return `
            <strong>☀️ Clima y Equipaje</strong><br>
            Arequipa tiene sol fuerte de día y frío de noche.<br>
            🎒 <em>Indispensable:</em>
            <ul class="bot-list">
                <li>Bloqueador solar y lentes</li>
                <li>Sombrero o gorra</li>
                <li>Casaca cortavientos</li>
                <li>Agua (1L min)</li>
            </ul>
        `;
    }

    // 📅 RESERVA Y CONTACTO
    if (text.includes('reserva') || text.includes('whatsapp') || text.includes('contacto')) {
        return `
            <strong>📅 ¡Reserva tu Aventura!</strong><br>
            1️⃣ Escríbenos al <strong>WhatsApp: +51 123 456 789</strong><br>
            2️⃣ Ve a la sección <a href="/contacto" style="color:#d32f2f;">Contacto</a><br>
            3️⃣ Correo: reservas@mistitours.com
        `;
    }

    // 👋 SALUDOS (Mejorado - Menú de opciones)
    if (text.includes('hola') || text.includes('buenos') || text.includes('hi')) {
        return `
            ¡Hola! 👋 <strong>Bienvenido a MistiTours.</strong><br>
            Soy tu asistente virtual. ¿Qué buscas hoy?<br><br>
            <ul class="bot-list">
                <li>📍 <strong>"Ver Destinos"</strong> (Catálogo)</li>
                <li>💰 <strong>"Ver Precios"</strong> (Lista rápida)</li>
                <li>💳 <strong>"Formas de Pago"</strong></li>
                <li>🚐 <strong>"Transporte Privado"</strong></li>
            </ul>
        `;
    }

    if (text.includes('gracias') || text.includes('chau')) {
        return '¡Gracias a ti! 👋 Esperamos verte pronto en Arequipa.';
    }

    // ❓ DEFAULT
    return `
        🤔 <strong>No entendí bien tu consulta.</strong><br>
        Intenta escribir palabras clave como:<br>
        <ul class="bot-list">
            <li>"Tours" o "Destinos"</li>
            <li>"Precios"</li>
            <li>"Pagos"</li>
            <li>"Colca"</li>
        </ul>
    `;
}

// Inicialización
window.addEventListener('load', () => {
    // Asegurar estado inicial correcto
    const chatWindow = document.getElementById('chatWindow');
    const chatbotButton = document.getElementById('chatbotButton');
    
    if (chatWindow && chatWindow.classList.contains('active')) {
        chatbotButton.style.display = 'none';
    } else {
        chatbotButton.style.display = 'flex';
    }
});