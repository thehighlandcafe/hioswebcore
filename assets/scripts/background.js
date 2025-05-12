document.addEventListener('DOMContentLoaded', function() {
    const backgroundSelector = document.getElementById('background-selector');
    const backgroundSelect = document.getElementById('backgroundSelect');
    const backgroundUploader = document.getElementById('uploadBackground');
    const backgroundImageElement = document.querySelector('.background-image');
    const bodyElement = document.body;
    const uploadedBgKey = 'userUploadedBackgroundImage';
    const dropdownKey = 'backgroundDropdownSelection';
    const baseThemeKey = 'userBaseTheme';
    const defaultBaseTheme = 'default-light';

    const autoColourToggle = document.getElementById('autoColourToggle');
    const genericColourSelect = document.getElementById('genericColourSelect');
    const genericColourKey = 'userGenericColourSelection';
    const autoColourKey = 'userAutoColourEnabled';

    function applyBackground(imageUrl) {
        backgroundImageElement.style.backgroundImage = `url('${imageUrl}')`;
        bodyElement.style.display = 'block';
    }

    function applyBaseTheme(theme) {
        bodyElement.className = theme;
        localStorage.setItem(baseThemeKey, theme);
    }

    function applyGenericColour(colour) {
        bodyElement.className = colour;
        localStorage.setItem(baseThemeKey, colour);
    }

    function updateGenericColourSelectState() {
        if (genericColourSelect) {
            genericColourSelect.disabled = autoColourToggle && autoColourToggle.checked;
        }
    }

    // Load saved settings and apply theme on initial load
    const savedUploadedBackground = localStorage.getItem(uploadedBgKey);
    const savedDropdownValue = localStorage.getItem(dropdownKey);
    const savedBaseTheme = localStorage.getItem(baseThemeKey) || defaultBaseTheme;
    const savedAutoColour = localStorage.getItem(autoColourKey) === 'true';
    const savedGenericColour = localStorage.getItem(genericColourKey);

    if (autoColourToggle) {
        autoColourToggle.checked = savedAutoColour;
        updateGenericColourSelectState();
    }

    if (savedUploadedBackground) {
        applyBackground(savedUploadedBackground);
        applyBaseTheme(defaultBaseTheme);
    } else if (savedDropdownValue) {
        applyBackground(savedDropdownValue);
        // Directly apply the theme associated with the saved wallpaper
        const themeForWallpaper = document.querySelector(`#backgroundSelect option[value="${savedDropdownValue}"]`)?.getAttribute('data-theme');
        applyBaseTheme(themeForWallpaper || defaultBaseTheme);
        if (backgroundSelect) {
            backgroundSelect.value = savedDropdownValue;
        }
    } else if (savedGenericColour && !(autoColourToggle && autoColourToggle.checked)) {
        applyGenericColour(savedGenericColour);
        if (genericColourSelect) {
            genericColourSelect.value = savedGenericColour;
        }
    } else {
        applyBaseTheme(defaultBaseTheme);
    }

    bodyElement.style.display = 'block'; // Ensure body is visible after applying initial theme

    // Handle toggle change
    if (autoColourToggle) {
        autoColourToggle.addEventListener('change', function() {
            localStorage.setItem(autoColourKey, this.checked);
            updateGenericColourSelectState();
            if (!this.checked && backgroundSelect && backgroundSelect.value !== 'https://thehighlandcafe.github.io/hioswebcore/assets/css/backgrounds/backgroundimage.png') {
                applyBaseTheme('default-light');
                localStorage.removeItem(baseThemeKey);
            } else if (this.checked && savedDropdownValue) {
                const themeForWallpaper = document.querySelector(`#backgroundSelect option[value="${savedDropdownValue}"]`)?.getAttribute('data-theme');
                applyBaseTheme(themeForWallpaper || defaultBaseTheme);
            } else if (this.checked) {
                applyBaseTheme(defaultBaseTheme);
            }
            localStorage.removeItem(genericColourKey);
        });
    }

    // Handle background dropdown change
    if (backgroundSelect) {
        backgroundSelect.addEventListener('change', function() {
            const selectedBg = this.value;
            applyBackground(selectedBg);
            localStorage.setItem(dropdownKey, selectedBg);
            localStorage.removeItem(uploadedBgKey);

            if (autoColourToggle && autoColourToggle.checked) {
                const selectedBaseTheme = this.options[this.selectedIndex].getAttribute('data-theme') || defaultBaseTheme;
                applyBaseTheme(selectedBaseTheme);
            } else if (autoColourToggle) {
                applyBaseTheme('default-light');
                localStorage.removeItem(baseThemeKey);
            }
            localStorage.removeItem(genericColourKey);
        });
    }

    // Handle generic colour dropdown change
    if (genericColourSelect) {
        genericColourSelect.addEventListener('change', function() {
            const selectedColour = this.value;
            applyGenericColour(selectedColour);
            localStorage.setItem(genericColourKey, selectedColour);
            localStorage.removeItem(baseThemeKey);
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
                    localStorage.removeItem(dropdownKey);
                    localStorage.removeItem(genericColourKey);
                    localStorage.setItem(autoColourKey, true);
                    if (autoColourToggle) {
                        autoColourToggle.checked = true;
                    }
                    updateGenericColourSelectState();
                    applyBaseTheme(defaultBaseTheme);
                }
                reader.readAsDataURL(file);
            }
        });
    }
});