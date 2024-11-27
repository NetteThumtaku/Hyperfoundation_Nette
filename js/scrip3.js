// --- Bestaande functionaliteit: Custom cursor en parallax effect ---
// Select the elements
const homeimgSection = document.querySelector('.monument2'); // The section to track mouse movement
const customCursor = document.querySelector('.cursor3'); // The custom cursor element
const soldierImage = document.querySelector('.overlay-person2'); // Soldier image

// Event listener for mousemove inside the section
homeimgSection.addEventListener('mousemove', (e) => {
    const rect = homeimgSection.getBoundingClientRect(); // Get the dimensions of the section
    const x = e.clientX - rect.left; // Calculate mouse x position relative to the section
    const y = e.clientY - rect.top; // Calculate mouse y position relative to the section

    // Move the custom cursor based on mouse position
    customCursor.style.left = `${x}px`;
    customCursor.style.top = `${y}px`;

    // Add slight movement for the soldier image (parallax effect)
    const soldierMoveX = ((x / rect.width) - 0.8) * 25; // Smaller movement for soldier on the x-axis
    const soldierMoveY = ((y / rect.height) - 0.8) * 25; // Smaller movement for soldier on the y-axis
    soldierImage.style.transform = `translate(${soldierMoveX}px, ${soldierMoveY}px)`; // Apply the movement to the soldier image
});

// Function to adjust the height of .monument2 dynamically
function setHeight() {
    const monument = document.querySelector('.monument2');
    monument.style.height = window.innerHeight + 'px'; // Set to the current window height
}

// Recalculate the height on window resize and initially
window.addEventListener('resize', setHeight);
setHeight();

// --- Nieuwe functionaliteit: Hotspots met audio ---
// Select the audio player
const audioPlayer = document.getElementById('audio-player');

// Select all hotspots
const hotspots = document.querySelectorAll('.hotspot');

// Add event listeners for hover interaction on each hotspot
hotspots.forEach((hotspot) => {
    // Play sound when hovering over the hotspot
    hotspot.addEventListener('mouseover', () => {
        const soundSrc = hotspot.getAttribute('data-sound'); // Get the sound file
        audioPlayer.src = soundSrc; // Set the source of the audio player
        audioPlayer.currentTime = 0; // Reset the audio to the beginning
        audioPlayer.play(); // Play the audio
    });

    // Stop sound when moving away from the hotspot
    hotspot.addEventListener('mouseout', () => {
        audioPlayer.pause(); // Pause the audio
        audioPlayer.currentTime = 0; // Reset the audio
    });
});
