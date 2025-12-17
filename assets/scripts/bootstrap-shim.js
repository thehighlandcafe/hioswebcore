// Minimal Bootstrap-like helpers for tabs/pills and toasts
(function () {
    function activateTab(button) {
        const targetSelector = button.getAttribute('data-bs-target');
        if (!targetSelector) return;

        // Activate button
        const siblingButtons = button.closest('.nav')?.querySelectorAll('.nav-link') || [];
        siblingButtons.forEach(b => b.classList.remove('active'));
        button.classList.add('active');

        // Activate pane
        const targetPane = document.querySelector(targetSelector);
        if (!targetPane) return;
        const tabContainer = targetPane.closest('.tab-content');
        if (!tabContainer) return;
        tabContainer.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('show', 'active');
        });
        targetPane.classList.add('show', 'active');
    }

    function wireTabs() {
        const toggles = document.querySelectorAll('[data-bs-toggle="pill"], [data-bs-toggle="tab"]');
        toggles.forEach(toggle => {
            toggle.addEventListener('click', evt => {
                evt.preventDefault();
                activateTab(toggle);
            });
        });
    }

    class Toast {
        constructor(element, opts = {}) {
            this.el = element;
            this.delay = opts.delay ?? 3000;
            this.timer = null;
        }

        show() {
            if (!this.el) return;
            this.el.classList.add('show');
            clearTimeout(this.timer);
            this.timer = setTimeout(() => this.hide(), this.delay);
        }

        hide() {
            if (!this.el) return;
            this.el.classList.remove('show');
        }

        static getOrCreateInstance(element, opts) {
            if (!element) return null;
            if (!element.__toastInstance) {
                element.__toastInstance = new Toast(element, opts);
            }
            return element.__toastInstance;
        }
    }

    function wireCloseButtons() {
        document.addEventListener('click', evt => {
            const closeBtn = evt.target.closest('.btn-close');
            if (!closeBtn) return;
            const toast = closeBtn.closest('.toast');
            if (toast && toast.__toastInstance) {
                toast.__toastInstance.hide();
            } else if (toast) {
                toast.classList.remove('show');
            }
        });
    }

    window.bootstrap = { Toast };

    document.addEventListener('DOMContentLoaded', () => {
        wireTabs();
        wireCloseButtons();
    });
})();
