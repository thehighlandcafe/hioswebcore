            function switchTab(buttonId) {
                // 1. Click the hidden bootstrap tab to trigger the content change
                const hiddenBtn = document.getElementById(buttonId);
                if (hiddenBtn) {
                    hiddenBtn.click();
                }

                // 2. Update the visual state of the header tabs
                // Remove 'active' from all header tabs
                document.querySelectorAll('.header-tab').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add 'active' to the specific button we just clicked (found by data-target)
                const activeBtn = document.querySelector(`.header-tab[data-target="${buttonId}"]`);
                if (activeBtn) {
                    activeBtn.classList.add('active');
                }
            }

            // New function specifically for the sub-menus
            function switchMenu(buttonId) {
                // 1. Click hidden sub-tab
                const hiddenBtn = document.getElementById(buttonId);
                if (hiddenBtn) {
                    hiddenBtn.click();
                }
                
                // 2. Update visuals for sub-tabs
                document.querySelectorAll('.sub-header-tab').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                const activeBtn = document.querySelector(`.sub-header-tab[data-target="${buttonId}"]`);
                if (activeBtn) {
                    activeBtn.classList.add('active');
                }
            }