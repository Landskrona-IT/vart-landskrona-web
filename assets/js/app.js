import AppBanner from './AppBanner';
import AppForm from './AppForm';

AppBanner.initialize();

window.addEventListener('load', function() {
    function waitForLimeForms(maxAttempts) {
        let attempts = 0;
        const interval = setInterval(function() {
            if (window.limeForms && typeof window.limeForms.getApi === 'function') {
                clearInterval(interval);
                console.log('[INFO] limeForms loaded, initializing app form...');
                AppForm.initialize();
            } else {
                attempts++;
                if (attempts >= maxAttempts) {
                    clearInterval(interval);
                    console.error('[ERROR] limeForms script did not load in time.');
                }
            }
        }, 200);
    }

    waitForLimeForms(50); // retry for 10 seconds
});
