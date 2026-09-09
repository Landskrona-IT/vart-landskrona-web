import AppBanner from './AppBanner';
import AppForm from './AppForm';
import MobileAppManager from './MobileAppManager';

function addReleaseBadge() {
    if (!MobileAppManager.isApp()) {
        return;
    }

    const badge = document.createElement('span');
    badge.className = 'web-release-badge';
    badge.textContent = `build ${__BUILD_ID__}`;
    badge.setAttribute('aria-hidden', 'true');

    const revealTarget = document.createElement('button');
    revealTarget.className = 'web-release-badge-target';
    revealTarget.type = 'button';
    revealTarget.tabIndex = -1;
    revealTarget.setAttribute('aria-hidden', 'true');
    revealTarget.addEventListener('click', () => {
        badge.classList.toggle('is-visible');
    });

    window.addEventListener('lime-form-step-change', (event) => {
        const isFirstStep = event.detail?.index === 0;
        revealTarget.hidden = !isFirstStep;
        badge.classList.remove('is-visible');
    });

    document.body.appendChild(badge);
    document.body.appendChild(revealTarget);
}

AppBanner.initialize();
window.addEventListener('DOMContentLoaded', addReleaseBadge);

window.addEventListener('load', function() {
    function waitForLimeForms(maxAttempts) {
        let attempts = 0;
        const interval = setInterval(function() {
            if (window.limeForms && typeof window.limeForms.getApi === 'function') {
                clearInterval(interval);
                console.log('[INFO] limeforms loaded, initializing app form...');
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
