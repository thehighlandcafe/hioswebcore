document.addEventListener('DOMContentLoaded', function() {
    const backgroundSelector = document.getElementById('background-selector');
    const backgroundSelect = document.getElementById('backgroundSelect');
    const backgroundUploader = document.getElementById('uploadBackground');
    const backgroundImageElement = document.querySelector('.background-image');
    const bodyElement = document.body;
    const bgKey = 'userBackgroundImage';
    const uploadedBgKey = 'userUploadedBackgroundImage';
    const dropdownKey = 'backgroundDropdownSelection'; // Key for saving dropdown value
  
    function applyBackground(imageUrl) {
        backgroundImageElement.style.backgroundImage = `url('${imageUrl}')`;
        bodyElement.style.display = 'block';
    }
  
    // Load saved background (uploaded or from dropdown) and dropdown selection
    const savedUploadedBackground = localStorage.getItem(uploadedBgKey);
    const savedDropdownValue = localStorage.getItem(dropdownKey);
  
    if (savedUploadedBackground) {
        applyBackground(savedUploadedBackground);
    } else if (savedDropdownValue) {
        applyBackground(savedDropdownValue);
        if (backgroundSelect) {
            backgroundSelect.value = savedDropdownValue; // Set dropdown to saved value
        }
    } else {
        bodyElement.style.display = 'block'; // Show default if nothing saved
    }
  
    // Handle dropdown change
    if (backgroundSelect) {
        backgroundSelect.addEventListener('change', function() {
            const selectedBg = this.value;
            applyBackground(selectedBg);
            localStorage.setItem(dropdownKey, selectedBg);
            localStorage.removeItem(bgKey); // Clean up old key if present
            localStorage.removeItem(uploadedBgKey); // Clear uploaded if dropdown selected
        });
    }
  
    // Handle file upload
    if (backgroundUploader) {
        backgroundUploader.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const dataUrl = e.target.result;
                    applyBackground(dataUrl);
                    localStorage.setItem(uploadedBgKey, dataUrl);
                    localStorage.removeItem(bgKey);
                    localStorage.removeItem(dropdownKey); // Clear dropdown selection
                }
                reader.readAsDataURL(file);
            }
        });
    }
  });