// Selecteer de benodigde elementen
const homeimgSection = document.querySelector('.homeimg');
const interactiveMap = document.querySelector('.interactive-map');
const customCursor = document.querySelector('.cursor');
const overlayItems = document.querySelectorAll('.overlay-items'); // Alle overlay-afbeeldingen
const audioElement = document.getElementById('demo'); // Audio-element
const overlayIcon = document.querySelector('.overlay-icon'); // De wiel afbeelding

let mouseX = 0, mouseY = 0;
let isDragging = false; // Houd bij of de kaart wordt versleept
let startX, startY, mapX = 0, mapY = 0; // Variabelen om de positie van de kaart te beheren
let scale = 1; // Zoom-schaal, begint bij 1 (geen zoom)
const zoomStep = 0.1; 
const maxScale = 3; 
const minScale = 1; 

// Functie om aangepaste cursor te verplaatsen
function moveCursor() {
    customCursor.style.left = `${mouseX - 10}px`;
    customCursor.style.top = `${mouseY - 10}px`;
}

// Aangepaste cursor verplaatsen bij muisbeweging in homeimgSection
homeimgSection.addEventListener('mousemove', (e) => {
    const rect = homeimgSection.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;

    moveCursor();
});

// Begin kaart slepen
interactiveMap.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX - mapX;
    startY = e.clientY - mapY;
    interactiveMap.style.cursor = 'grabbing'; // Verander cursor naar grabbing bij slepen
});

// Kaart verplaatsen bij muisbeweging
document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault(); // Stop scrollen van de pagina

    // Bereken nieuwe positie van de kaart
    mapX = e.clientX - startX;
    mapY = e.clientY - startY;

    applyBoundaries();
    updateMapTransform();
});

// Stop kaart slepen
document.addEventListener('mouseup', () => {
    isDragging = false;
    interactiveMap.style.cursor = 'grab'; // Verander cursor terug naar grab
});

// Grenzen toepassen op de kaartpositie
function applyBoundaries() {
    const containerRect = homeimgSection.getBoundingClientRect();
    const mapRect = interactiveMap.getBoundingClientRect();

    const scaledWidth = mapRect.width * scale;
    const scaledHeight = mapRect.height * scale;

    const maxLeft = containerRect.width - scaledWidth;
    const maxTop = containerRect.height - scaledHeight;
    const maxRight = 0;
    const maxBottom = 0;

    mapX = Math.min(maxRight, Math.max(maxLeft, mapX));
    mapY = Math.min(maxBottom, Math.max(maxTop, mapY));
}

// Functie om de transform-property van de kaart te updaten (positie en zoom)
function updateMapTransform() {
    interactiveMap.style.transform = `translate(${mapX}px, ${mapY}px) scale(${scale})`;
    updateOverlayItemsPosition();
}

// Update positie van overlay-items op basis van zoom en kaartpositie
function updateOverlayItemsPosition() {
    overlayItems.forEach(item => {
        const originalX = parseFloat(item.getAttribute('data-x')) || 0; // Haal originele x-positie op
        const originalY = parseFloat(item.getAttribute('data-y')) || 0; // Haal originele y-positie op

        const itemX = (originalX * scale) + mapX;
        const itemY = (originalY * scale) + mapY;

        item.style.transform = `translate(${itemX}px, ${itemY}px)`;
    });
}

// Kaart centreren bij het laden van de pagina
window.addEventListener('load', () => {
    centerMap();
});

// Functie om de kaart te centreren
function centerMap() {
    const containerRect = homeimgSection.getBoundingClientRect();
    const mapRect = interactiveMap.getBoundingClientRect();

    mapX = (containerRect.width - mapRect.width * scale) / 2;
    mapY = (containerRect.height - mapRect.height * scale) / 2;

    updateMapTransform();
}

// Functie om audio af te spelen of te pauzeren bij klik op de overlay-icon
overlayIcon.addEventListener('click', () => {
    if (audioElement.paused) {
        audioElement.play(); // Speel audio af als het gepauzeerd is
    } else {
        audioElement.pause(); // Pauzeer audio als het speelt
    }
});
