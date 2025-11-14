/*
 * HiOS Core Scripts
 * Includes:
 * 1. Dynamic Theme/Background Switcher
 * 2. Automatic Liquid Glass Effect Injector
 */

// --- 1. Dynamic Theme/Background Switcher ---
// THIS SECTION IS UNCHANGED.
function themeSwitcher() {
    // Read the *wallpaper* choice
    const wallpaperTheme = localStorage.getItem('hiosWallpaperTheme') || 'default-light';
    // Read the *color* choice
    const colorTheme = localStorage.getItem('hiosColorTheme') || 'default-light';
    
    // Apply the COLOR theme to the body class
    document.body.className = colorTheme;

    // Find the background image element
    const bgImage = document.querySelector('.background-image');
    if (!bgImage) {
        console.error("Background image element '.background-image' not found.");
        return;
    }

    let imageUrl = "url('https://thehighlandcafe.github.io/hioswebcore/assets/css/backgrounds/backgroundimage.png')"; // Default

    // Set the correct wallpaper URL based on the WALLPAPER theme
    switch (wallpaperTheme) {
        case 'city':
            imageUrl = "url('https://thehighlandcafe.github.io/hioswebcore/assets/css/backgrounds/backgroundimage.jpg')";
            break;
        case 'night-sky':
            imageUrl = "url('https://thehighlandcafe.github.io/hioswebcore/assets/css/backgrounds/homebackground.jpg')"; 
            break;
        case 'default-dark':
            imageUrl = "url('https://thehighlandcafe.github.io/hioswebcore/assets/css/backgrounds/background-dark.png')";
            break;
        case 'morocco':
            imageUrl = "url('https://thehighlandcafe.github.io/hioswebcore/assets/css/backgrounds/dades-gorge.jpg')";
            break;
        case 'clouds':
            imageUrl = "url('https://thehighlandcafe.github.io/hioswebcore/assets/css/backgrounds/british-clouds.jpg')";
            break;
        case 'blossoms':
            imageUrl = "url('https://thehighlandcafe.github.io/hioswebcore/assets/css/backgrounds/blossoms.jpg')";
            break;
        case 'london':
            imageUrl = "url('https://thehighlandcafe.github.io/hioswebcore/assets/css/backgrounds/london.jpg')";
            break;
        default:
            // Find the base path
            let basePath = "https://thehighlandcafe.github.io/hioswebcore/assets/css/backgrounds/backgroundimage.png"; 
            
            imageUrl = `url('${basePath}')`;
            break;
    }
    
    bgImage.style.backgroundImage = imageUrl;
}

// Run the theme switcher as soon as the script loads
themeSwitcher();


// --- 2. Automatic Liquid Glass Effect ---
// THIS SECTION IS UPDATED with the new toggle logic.

/**
 * Runs when the page content is loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // Check if Liquid Glass is enabled
    const isGlassEnabled = localStorage.getItem('hiosLiquidGlass') !== 'false'; // Default to true

    /*
     * NEW LOGIC:
     * Step 1: ALWAYS wrap the cards to create the 4-layer structure.
     * This enables the "simple frost" effect by default.
     */
    wrapAllCards();

    if (isGlassEnabled) {
        // Step 2: If the toggle is ON, inject the SVG filter...
        injectSvgFilter();
        // ...and add a class to the body to activate the distortion.
        document.body.classList.add('liquid-glass-on');
    }
    // If the toggle is OFF, we simply don't add the filter or the class.
    

    /*
     * This line is correct. It makes the page visible
     * *after* the theme is set, preventing all flashing.
     */
    document.body.style.display = 'block';
});

/**
 * Injects the advanced SVG filter needed for the "edge-focused" liquid distortion.
 * This is hidden and only needs to exist once on the page.
 */
function injectSvgFilter() {
    // Only add the filter if it doesn't already exist
    if (document.getElementById('lg-dist')) {
        return;
    }

    const svgFilter = `
    <svg style="position: absolute; width: 0; height: 0; overflow: hidden;" aria-hidden="true">
      <filter id="lg-dist">
        
        <!-- 1. Create the turbulence (the "wavy" noise) -->
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.01 0.03"
          numOctaves="1"
          result="turbulence"
          seed="0"
        />

        <!-- 2. Get the shape of the card (the alpha) and blur it -->
        <feGaussianBlur stdDeviation="10" in="SourceAlpha" result="blur"/>

        <!-- 3. Invert the blur to create an "edge mask" -->
        <!-- This makes the center black (0) and edges white (1) -->
        <feColorMatrix
          type="matrix"
          in="blur"
          result="edge_gradient"
          values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 -1 1"
        />

        <!-- 4. Multiply the turbulence by the edge mask -->
        <!-- This makes the turbulence 100% at the edge and 0% in the center -->
        <feComposite
          in="turbulence"
          in2="edge_gradient"
          operator="in"
          result="edge_turbulence"
        />
        
        <!-- 5. Apply the new "edge-only" turbulence as distortion -->
        <!-- Increased scale to 50 to make the edge effect obvious -->
        <feDisplacementMap
          in="SourceGraphic"
          in2="edge_turbulence"
          scale="50" 
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
    `;

    // Create a temporary div to hold the SVG and inject it
    const container = document.createElement('div');
    container.innerHTML = svgFilter;
    document.body.appendChild(container.firstElementChild);
}

/**
 * Finds all elements with class ".card" and wraps their content
 * in the 4-layer structure needed for the liquid glass effect.
 */
function wrapAllCards() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        // Safety check: If we already wrapped this card, skip it
        if (card.querySelector('.glass-filter')) {
            return;
        }

        // Save the card's original content
        const originalContent = card.innerHTML;

        // Clear the card and build the new 4-layer structure
        card.innerHTML = '';

        // Create the 4 layers
        const filter = document.createElement('div');
        filter.className = 'glass-filter';

        const overlay = document.createElement('div');
        overlay.className = 'glass-overlay';

        const specular = document.createElement('div');
        specular.className = 'glass-specular';

        const content = document.createElement('div');
        content.className = 'glass-content';
        content.innerHTML = originalContent; // Put the original content back

        // Add the new layers into the card
        card.appendChild(filter);
        card.appendChild(overlay);
        card.appendChild(specular);
        card.appendChild(content);

        // Add a class to the parent card so our CSS can style it
        card.classList.add('glass-container-ready');
    });
}