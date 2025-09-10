function link(webpage) {
    window.location.href = webpage;
}

function prev() {
    history.go(-1);
}

    document.addEventListener('DOMContentLoaded', () => {
        const interactiveElements = document.querySelectorAll('.fluent-interactive');

        interactiveElements.forEach(elem => {
            elem.addEventListener('mousemove', (e) => {
                const rect = e.target.getBoundingClientRect();
                const x = e.clientX - rect.left; // x position within the element.
                const y = e.clientY - rect.top;  // y position within the element.

                elem.style.setProperty('--x', `${x}px`);
                elem.style.setProperty('--y', `${y}px`);
            });
        });
    });