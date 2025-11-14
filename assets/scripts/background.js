/*
 * HiOS Core Scripts
 * Includes:
 * 1. Dynamic Theme/Background Switcher
 * 2. Automatic Liquid Glass Effect Injector
 */

// --- 1. Dynamic Theme/Background Switcher ---
// (This is your existing logic from the file)

function themeSwitcher() {
    // Check user's preference and apply the correct theme class to the <body>
    const savedTheme = localStorage.getItem('hiosTheme');
    if (savedTheme) {
        document.body.className = savedTheme;
    } else {
        // Default to 'city' if no theme is saved
        document.body.className = 'city';
    }

    // Make the body visible after the theme is applied to prevent flashing
    /* * REMOVE THIS LINE! We will move it to the end of the
     * DOMContentLoaded listener so the page stays hidden
     * while the cards are wrapped.
     */
    /* document.body.style.display = 'block'; */
}

// Run the theme switcher as soon as the script loads
themeSwitcher();


// --- 2. Automatic Liquid Glass Effect ---

/**
 * Runs when the page content is loaded.
 * This starts the whole glass effect process.
 */
document.addEventListener('DOMContentLoaded', () => {
    injectSvgFilter();
    wrapAllCards();

    /*
     * ADD THIS LINE HERE!
     * Now that all the heavy JavaScript work is done,
     * we can safely make the page visible.
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