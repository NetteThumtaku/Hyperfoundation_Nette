// Select the elements
const homeimgSection = document.querySelector('.monument1'); // The section to track mouse movement
const customCursor = document.querySelector('.cursor2'); // The custom cursor element
const soldierImage = document.querySelector('.overlay-person1'); // Soldier image

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
    // Adjust the height of .monument1 dynamically
    function setHeight() {
    const monument = document.querySelector('.monument1');
    monument.style.height = window.innerHeight + 'px'; // Set to the current window height
}

    window.addEventListener('resize', setHeight); // Recalculate on window resize
    setHeight(); // Initial calculation

});

