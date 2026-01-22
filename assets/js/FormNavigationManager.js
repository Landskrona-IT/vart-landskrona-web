import FormNavigationScroll from './Navigation/Scroll';
import FormNavigationBackButton from './Navigation/BackButton';
import FormNavigationStepChange from './Navigation/StepChange';
import FormNavigationSubmitted from './Navigation/Submitted';
import FormNavigationButtons from './Navigation/CloseCancelButton';

const SOURCE_FIELD = 'forms_source';
const SOURCE_VALUE = 'app';

class FormNavigationManager {
  static initialize() {
    const formsApi = window.limeForms.getApi();

    FormNavigationScroll.setupScroll(formsApi);
    FormNavigationBackButton.setupBackButton(formsApi);
    FormNavigationStepChange.setupStepChange(formsApi);
    FormNavigationSubmitted.setupSubmitted(formsApi);
    FormNavigationButtons.setupCancelAndCloseButtons();

    formsApi.onReady(() => {

      const ensureSourceIsApp = () => {
        let updated = false;

        // API method
        if (typeof formsApi.setFieldValue === 'function') {
          const current =
              typeof formsApi.getFieldValue === 'function'
                  ? formsApi.getFieldValue(SOURCE_FIELD)
                  : null;

          if (current !== SOURCE_VALUE) {
            // Lets set both indexed + non-indexed fields since lime could is bork.
            formsApi.setFieldValue(SOURCE_FIELD, SOURCE_VALUE);
            updated = true;
          }
        }

        // DOM method (fallback)
        const input = document.querySelector(`input[data-name="${SOURCE_FIELD}"]`);
        if (input && input.value !== SOURCE_VALUE) {
          input.value = SOURCE_VALUE;
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
          updated = true;
        }

        return updated;
      };

      ensureSourceIsApp();

      // Observe DOM additions only (field re-created by Lime)
      const observer = new MutationObserver(() => {
        ensureSourceIsApp();
      });

      observer.observe(document.getElementById('app') ?? document.body, {
        childList: true,
        subtree: true,
      });

      // Retry window to fight Lime initialization overrides
      const retryInterval = setInterval(ensureSourceIsApp, 500);
      setTimeout(() => clearInterval(retryInterval), 5000);

      // Re-apply on step changes.
      formsApi.onStepChange((from, to) => ensureSourceIsApp(from, to));

      setTimeout(() => {
        document.querySelector('.loader')?.remove();
      }, 1000);
    });
  }
}

export default FormNavigationManager;
