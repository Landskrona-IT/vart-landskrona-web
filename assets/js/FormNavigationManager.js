import FormNavigationScroll from './Navigation/Scroll';
import FormNavigationBackButton from './Navigation/BackButton';
import FormNavigationStepChange from './Navigation/StepChange';
import FormNavigationSubmitted from './Navigation/Submitted';
import FormNavigationButtons from './Navigation/CloseCancelButton';

class FormNavigationManager {
  static initialize() {
    const formsApi = window.limeForms.getApi();

    FormNavigationScroll.setupScroll(formsApi);
    FormNavigationBackButton.setupBackButton(formsApi);
    FormNavigationStepChange.setupStepChange(formsApi);
    FormNavigationSubmitted.setupSubmitted(formsApi);
    FormNavigationButtons.setupCancelAndCloseButtons();

    formsApi.onReady(function() {
      setTimeout(function() {
        document.querySelector(".loader").remove(); 
      }, 1000);
    }); 
  }
}

export default FormNavigationManager;
