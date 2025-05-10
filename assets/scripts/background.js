document.addEventListener('DOMContentLoaded', function() {
    const backgroundSelector = document.getElementById('background-selector');
    const backgroundImageElement = document.querySelector('.background-image');
    const bgKey = 'userBackgroundImage';
  
    // Function to apply the background image
    function applyBackground(imageUrl) {
      backgroundImageElement.style.backgroundImage = `url('${imageUrl}')`;
    }
  
    // Check if a background is already saved in localStorage
    const savedBackground = localStorage.getItem(bgKey);
    if (savedBackground) {
      applyBackground(savedBackground);
    }
  
    // Event listener for background selector clicks
    if (backgroundSelector) {
      backgroundSelector.addEventListener('click', function(event) {
        if (event.target.tagName === 'BUTTON') {
          const selectedBg = event.target.getAttribute('data-bg');
          applyBackground(selectedBg);
          localStorage.setItem(bgKey, selectedBg); // Save the preference
        }
      });
    }
  });