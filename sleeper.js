const goatImage = document.getElementById('GOAT');
let audio = null;  // Variable para almacenar el objeto de audio
let sheepCount = 0;  // Contador de ovejitas
let countingActive = false;  // Indicador de si el conteo está activo
let startMessage = null;  // Mensaje de inicio
let sheepMessage = null;  // Mensaje de las ovejitas
let probabilityMessage = null;  // Mensaje de probabilidad

// Leer el récord desde localStorage (si existe) y mostrarlo en el HTML
let record = parseInt(localStorage.getItem('record')) || 0; // Si no hay récord, usar 0 como valor predeterminado

// Obtener el elemento HTML donde se mostrará el récord
const recordMessage = document.getElementById('recordMessage');
recordMessage.textContent = `Record: ${record} lamb${record > 1 ? 's' : ''}`;

// Función para reiniciar todo
function resetCounting() {
    // Limpiar todos los mensajes existentes (excepto el de récord)
    const messages = document.querySelectorAll('p');
    messages.forEach(message => message.remove());

    // Reiniciar el contador
    sheepCount = 1;

    // Reiniciar el conteo y mostrar el primer mensaje
    if (!countingActive) {
        countingActive = true;  // Iniciar el conteo

        // Reiniciar la imagen del GOAT
        goatImage.src = '/media/sleeper2.png';  // Cambia la ruta de la imagen original
        goatImage.alt = 'GOAT';  // Cambiar el texto alternativo a la imagen original

        // Crear el sonido y configurarlo para que se reproduzca en bucle
        if (audio) audio.pause();  // Detener cualquier audio previo
        audio = new Audio('/media/snore.mp3');  // Reemplaza con la ruta correcta de tu archivo MP3
        audio.loop = true;  // Reproducir el audio en bucle
        audio.play();  // Iniciar la reproducción del audio

        // Crear el mensaje de inicio
        startMessage = document.createElement('p');
        startMessage.textContent = "🐑 Let's start counting lambs! 🐑"; // Mensaje con emoticonos
        startMessage.style.fontSize = '24px'; 
        startMessage.style.fontWeight = 'bold';
        startMessage.style.textAlign = 'center';
        startMessage.style.color = '#4CAF50';  // Color verde
        startMessage.style.fontFamily = 'Arial, sans-serif';
        startMessage.style.padding = '20px';
        startMessage.style.border = '2px solid #4CAF50';
        startMessage.style.borderRadius = '10px';
        startMessage.style.backgroundColor = '#e8f5e9';
        startMessage.style.transition = 'transform 0.5s ease-in-out';
        document.body.appendChild(startMessage);

        // Agregar animación al mensaje de inicio
        setTimeout(() => {
            startMessage.style.transform = 'scale(1.2)';
        }, 100);

        // Crear el mensaje de las ovejitas (lambs)
        sheepMessage = document.createElement('p');
        sheepMessage.textContent = `${sheepCount} 🐑 Lamb`; // Inicializa con 1 lamb
        sheepMessage.style.fontSize = '20px';
        sheepMessage.style.textAlign = 'center';
        sheepMessage.style.color = '#2196F3';  // Color azul
        sheepMessage.style.fontFamily = 'Arial, sans-serif';
        sheepMessage.style.padding = '10px';
        document.body.appendChild(sheepMessage);

        // Mensaje de probabilidad
        probabilityMessage = document.createElement('p');
        probabilityMessage.style.fontSize = '18px';
        probabilityMessage.style.textAlign = 'center';
        probabilityMessage.style.color = '#FF5722'; // Color naranja
        probabilityMessage.style.fontFamily = 'Arial, sans-serif';
        probabilityMessage.style.padding = '10px';
        document.body.appendChild(probabilityMessage);

        // Actualizar el mensaje de probabilidad
        updateProbabilityMessage();

        // Contar las ovejitas (lambs) cada 1 segundo
        setInterval(countSheep, 1000); // Llama a la función `countSheep` cada 1 segundo (1000ms)
    }
}

// Función para actualizar el mensaje de probabilidad
function updateProbabilityMessage() {
    const probability = calculateSuccessProbability();
    probabilityMessage.textContent = `Chance of reaching ${sheepCount} lambs: ${probability}%`;
}

// Función para calcular la probabilidad de continuar
function calculateSuccessProbability() {
    let probability = Math.pow(0.9, sheepCount) * 100;  // Acumula la probabilidad de no dormirte
    return probability.toFixed(2);  // Devuelve la probabilidad con 2 decimales
}

// Función que calcula el conteo de ovejitas (lambs)
function countSheep() {
    if (!countingActive) return;  // Si el conteo se detiene, no hace nada más

    // Actualizamos el mensaje de los corderitos (lambs)
    sheepMessage.textContent = `${sheepCount} 🐑 Lamb${sheepCount > 1 ? 's' : ''}`;

    // Aumentar el contador de corderitos
    sheepCount++;

    // Actualizamos el mensaje de probabilidad
    updateProbabilityMessage();

    // Verificar si debe detenerse el conteo con una probabilidad del 10%
    if (Math.random() < 0.1) {  // Probabilidad del 10% de detener el conteo
        stopCounting();  // Llamar a la función para detener el conteo
    }
}

// Función para detener el conteo
function stopCounting() {
    countingActive = false;  // Detener el contador
    const stopMessage = document.createElement('p');
    stopMessage.textContent = `😴 You've fallen asleep. Good night! 💤\nYou made it to ${sheepCount} lambs, chance of reaching this number: ${calculateSuccessProbability()}%`; 

    // Estilo del mensaje de parada
    stopMessage.style.fontSize = '24px';
    stopMessage.style.fontWeight = 'bold';
    stopMessage.style.textAlign = 'center';
    stopMessage.style.color = '#FF5722';  // Color naranja
    stopMessage.style.fontFamily = 'Arial, sans-serif';
    stopMessage.style.padding = '20px';
    stopMessage.style.border = '2px solid #FF5722';
    stopMessage.style.borderRadius = '10px';
    stopMessage.style.backgroundColor = '#FFEBEE';

    // Agregar el mensaje de parada al body
    document.body.appendChild(stopMessage);

    // Detener el audio al finalizar
    if (audio) {
        audio.pause();
    }

    // Verificar si hemos batido el récord
    if (sheepCount > record) {
        record = sheepCount;  // Actualizamos el récord
        localStorage.setItem('record', record);  // Guardamos el nuevo récord en localStorage

        // Actualizamos el mensaje del récord en el HTML
        recordMessage.textContent = `New Record: ${record} lamb${record > 1 ? 's' : ''}`;
    }
}

// Al hacer clic en la imagen del cabrito, reiniciar o comenzar el conteo
goatImage.addEventListener('click', resetCounting);
