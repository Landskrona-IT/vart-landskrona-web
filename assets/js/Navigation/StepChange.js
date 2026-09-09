class FormNavigationStepChange {
  static setupStepChange(formsApi) {
    formsApi.onStepChange((from, to) => {
      window.dispatchEvent(new CustomEvent('lime-form-step-change', {
        detail: { index: to.index },
      }));

      const backButton = document.getElementById("back-button");
      if (backButton) {
        if (to.index === 0 || formsApi.steps.length === to.index) {
          backButton.classList.add("u-display--none");
          backButton.setAttribute('aria-hidden', "true");
        } else {
          backButton.classList.remove("u-display--none");
          backButton.removeAttribute('aria-hidden');
        }
      }
    });
  }
}

export default FormNavigationStepChange;
