document.addEventListener('DOMContentLoaded', function() {
    const backgroundImageElement = document.querySelector('.background-image');
    const bodyElement = document.body;
    const dropdownKey = 'backgroundDropdownSelection';
    const baseThemeKey = 'userbasetheme';
    const defaultBaseTheme = 'default-light';
    const backgroundSelect = document.getElementById('backgroundSelect');
    const autoColourToggle = document.getElementById('autoColourToggle');
    const genericColourSelect = document.getElementById('genericColourSelect');
    const genericColourKey = 'userGenericColourSelection';
    const autoColourKey = 'userAutoColourEnabled';

    function applyBackground(imageUrl) {
        if (backgroundImageElement) {
            backgroundImageElement.style.backgroundImage = `url('${imageUrl}')`;
            bodyElement.style.display = 'block';
        }
    }

    function applyBaseTheme(theme) {
        bodyElement.className = theme;
        localStorage.setItem(baseThemeKey, theme);
        console.log('Applying theme:', theme); // Debugging log
    }

    function applyGenericColour(colour) {
        bodyElement.className = colour;
        localStorage.setItem(baseThemeKey, colour);
        console.log('Applying generic colour:', colour); // Debugging log
    }

    function updateGenericColourSelectState() {
        if (genericColourSelect) {
            genericColourSelect.disabled = autoColourToggle && autoColourToggle.checked;
        }
    }

    // Load saved settings and apply theme/selections on initial load (runs on every page)
    const savedDropdownValue = localStorage.getItem(dropdownKey);
    const savedBaseTheme = localStorage.getItem(baseThemeKey);
    const savedAutoColour = localStorage.getItem(autoColourKey) === 'true';
    const savedGenericColour = localStorage.getItem(genericColourKey);

    if (autoColourToggle) {
        autoColourToggle.checked = savedAutoColour;
        updateGenericColourSelectState();
    }

    if (savedDropdownValue && backgroundSelect) {
        applyBackground(savedDropdownValue);
        backgroundSelect.value = savedDropdownValue;
    } else if (savedDropdownValue) {
        applyBackground(savedDropdownValue);
    }

    if (savedAutoColour) {
        if (savedBaseTheme && !savedBaseTheme.startsWith('generic-')) {
            applyBaseTheme(savedBaseTheme);
        } else {
            applyBaseTheme(defaultBaseTheme);
        }
    } else {
        if (savedGenericColour) {
            applyGenericColour(savedGenericColour);
            if (genericColourSelect) {
                genericColourSelect.value = savedGenericColour;
            }
        } else {
            applyBaseTheme(defaultBaseTheme);
        }
    }

    bodyElement.style.display = 'block'; // Ensure body is visible

    // Handle toggle change (ONLY on appearance page)
    if (autoColourToggle) {
        autoColourToggle.addEventListener('change', function() {
            localStorage.setItem(autoColourKey, this.checked);
            updateGenericColourSelectState();
            if (!this.checked) {
                const currentGeneric = localStorage.getItem(genericColourKey);
                if (currentGeneric) {
                    applyGenericColour(currentGeneric);
                } else {
                    applyBaseTheme('default-light');
                }
            } else if (this.checked && savedDropdownValue) {
                const themeForWallpaper = document.querySelector(`#backgroundSelect option[value="${savedDropdownValue}"]`)?.getAttribute('data-theme');
                applyBaseTheme(themeForWallpaper || defaultBaseTheme);
            } else if (this.checked) {
                applyBaseTheme(defaultBaseTheme);
            }
            window.location.reload(); // Refresh the page
        });
    }

    // Handle background dropdown change (ONLY on appearance page)
    if (backgroundSelect) {
        backgroundSelect.addEventListener('change', function() {
            const selectedBg = this.value;
            applyBackground(selectedBg);
            localStorage.setItem(dropdownKey, selectedBg);
            if (autoColourToggle && autoColourToggle.checked) {
                const selectedBaseTheme = this.options[this.selectedIndex].getAttribute('data-theme') || defaultBaseTheme;
                applyBaseTheme(selectedBaseTheme);
            } else if (autoColourToggle) {
                const currentGeneric = localStorage.getItem(genericColourKey);
                if (currentGeneric) {
                    applyGenericColour(currentGeneric);
                } else {
                    applyBaseTheme('default-light');
                }
            }
            window.location.reload(); // Refresh the page
        });
    }

    // Handle generic colour dropdown change (ONLY on appearance page)
    if (genericColourSelect) {
        genericColourSelect.addEventListener('change', function() {
            const selectedColour = this.value;
            applyGenericColour(selectedColour);
            localStorage.setItem(genericColourKey, selectedColour);
            localStorage.setItem(autoColourKey, false);
            if (autoColourToggle) {
                autoColourToggle.checked = false;
                updateGenericColourSelectState();
            }
            window.location.reload(); // Refresh the page
        });
    }
});