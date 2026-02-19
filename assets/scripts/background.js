/*
 * HiOS Core Scripts
 * Includes:
 * 1. Dynamic Theme/Background Switcher
 * 2. Automatic Liquid Glass Effect Injector
 */

// --- 1. Dynamic Theme/Background Switcher ---
function themeSwitcher() {
    // Read toggles (default ON for both)
    const storedBg = localStorage.getItem('hiosBackgroundEnabled');
    const effectsEnabled = storedBg === null ? true : storedBg === 'true';
    const storedAcrylic = localStorage.getItem('hiosAcrylicEnabled');
    const acrylicEnabled = storedAcrylic === null ? true : storedAcrylic === 'true';

    // Read the *wallpaper* choice
    const wallpaperTheme = localStorage.getItem('hiosWallpaperTheme') || 'default';
    // Read the *color* choice
    const colorTheme = localStorage.getItem('hiosColorTheme') || 'default-light';
    
    // Read *Dark Mode* Preference (light, dark, or auto)
    const darkModePref = localStorage.getItem('hiosDarkModePreference') || 'auto';
    
    // Determine if we should show dark mode content
    let isDarkMode = false;
    if (darkModePref === 'auto') {
        isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } else {
        isDarkMode = darkModePref === 'dark';
    }

    // Apply the COLOR theme to the body class
    document.body.className = colorTheme;
    if (!effectsEnabled) {
        document.body.classList.add('background-off');
    } else {
        document.body.classList.remove('background-off');
    }
    document.body.classList.toggle('acrylic-on', acrylicEnabled && effectsEnabled);

    // Find the background image element
    const bgImage = document.querySelector('.background-image');
    if (!bgImage) {
        console.error("Background image element '.background-image' not found.");
        return;
    }

    if (!effectsEnabled) {
        bgImage.style.backgroundImage = 'none';
        return;
    }

    // Base path for backgrounds
    const basePath = "https://thehighlandcafe.github.io/hioswebcore/assets/css/backgrounds/";
    
    let imageUrl = "";

    /* Logic:
     * Check wallpaperTheme and isDarkMode to pick the right file.
     * Naming convention: 'name.jpg' vs 'name-dark.jpg'
     */

    switch (wallpaperTheme) {
        case 'spain':
            imageUrl = isDarkMode 
                ? `url('${basePath}spain-dark.png')` 
                : `url('${basePath}spain.jpg')`;
            break;
        case 'turkey':
            imageUrl = isDarkMode 
                ? `url('${basePath}turkey-dark.png')` 
                : `url('${basePath}turkey.jpg')`;
            break;
        case 'france':
            imageUrl = isDarkMode 
                ? `url('${basePath}france-dark.png')` 
                : `url('${basePath}france.jpg')`;
            break;
        case 'morocco':
            imageUrl = isDarkMode 
                ? `url('${basePath}morocco-dark.png')` 
                : `url('${basePath}morocco.jpg')`;
            break;
        case 'clouds':
            imageUrl = isDarkMode 
                ? `url('${basePath}clouds-dark.png')` 
                : `url('${basePath}clouds.jpg')`;
            break;
        case 'london':
            imageUrl = isDarkMode 
                ? `url('${basePath}london-dark.png')` 
                : `url('${basePath}london.jpg')`;
            break;
        case 'dobrota':
            imageUrl = isDarkMode 
                ? `url('${basePath}dobrota-dark.png')` 
                : `url('${basePath}dobrota.jpg')`;
            break;
        case 'yorkshire':
            imageUrl = isDarkMode
                ? `url('${basePath}yorkshire-dark.png')`
                : `url('${basePath}yorkshire.jpg')`;
            break;
        case 'scotland':
            imageUrl = isDarkMode 
                ? `url('${basePath}scotland-dark.png')` 
                : `url('${basePath}scotland.jpg')`;
            break;
        default:
            // "Default"
            imageUrl = isDarkMode 
                ? `url('${basePath}backgroundimage-dark.png')` 
                : `url('${basePath}backgroundimage.png')`;
            break;
    }
    
    bgImage.style.backgroundImage = imageUrl;
}

// Listen for system theme changes to update wallpaper dynamically (only if Auto is selected)
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        const pref = localStorage.getItem('hiosDarkModePreference') || 'auto';
        if (pref === 'auto') {
            themeSwitcher();
        }
    });
}

// Run the theme switcher as soon as the script loads
themeSwitcher();


// --- 2. Automatic Liquid Glass Effect ---
/**
 * Runs when the page content is loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // Check toggles (background and acrylic are independent, default ON)
    const storedBg = localStorage.getItem('hiosBackgroundEnabled');
    const effectsEnabled = storedBg === null ? true : storedBg === 'true';

    const storedAcrylic = localStorage.getItem('hiosAcrylicEnabled');
    const isGlassEnabled = storedAcrylic === null ? true : storedAcrylic === 'true';

    if (isGlassEnabled) {
        // Only wrap/inject when acrylic is enabled
        wrapAllCards();
        injectSvgFilter();
        document.body.classList.add('liquid-glass-on', 'acrylic-on');
    }
    
    document.body.style.display = 'block';
});

/**
 * Injects the advanced SVG filter needed for the "edge-focused" liquid distortion.
 */
function injectSvgFilter() {
    if (document.getElementById('lg-dist')) return;

    const svgFilter = `
    <svg style="position: absolute; width: 0; height: 0; overflow: hidden;" aria-hidden="true">
      <filter id="lg-dist">
        <feTurbulence type="fractalNoise" baseFrequency="0.01 0.03" numOctaves="1" result="turbulence" seed="0" />
        <feGaussianBlur stdDeviation="10" in="SourceAlpha" result="blur"/>
        <feColorMatrix type="matrix" in="blur" result="edge_gradient" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 -1 1" />
        <feComposite in="turbulence" in2="edge_gradient" operator="in" result="edge_turbulence" />
        <feDisplacementMap in="SourceGraphic" in2="edge_turbulence" scale="50" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
    `;

    const container = document.createElement('div');
    container.innerHTML = svgFilter;
    document.body.appendChild(container.firstElementChild);
}

/**
 * Finds all elements with class ".card" and wraps their content
 */
function wrapAllCards() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        if (card.querySelector('.glass-filter')) return;

        const originalContent = card.innerHTML;
        card.innerHTML = '';

        const filter = document.createElement('div');
        filter.className = 'glass-filter';
        const overlay = document.createElement('div');
        overlay.className = 'glass-overlay';
        const specular = document.createElement('div');
        specular.className = 'glass-specular';
        const content = document.createElement('div');
        content.className = 'glass-content';
        content.innerHTML = originalContent;

        card.appendChild(filter);
        card.appendChild(overlay);
        card.appendChild(specular);
        card.appendChild(content);

        card.classList.add('glass-container-ready');
    });
}