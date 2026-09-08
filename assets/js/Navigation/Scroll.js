class FormNavigationScroll {
  static resetScrollPosition() {
    const reset = () => {
      // iOS WebView can retain a horizontal offset while Lime replaces a step.
      // Reset every possible scrolling element, not only window.scrollTo().
      window.scrollTo(0, 0);
      document.documentElement.scrollLeft = 0;
      document.body.scrollLeft = 0;

      const app = document.getElementById('app');
      if (app) {
        app.scrollLeft = 0;
      }
    };

    reset();

    // Lime mutates the DOM after onStepChange. Reapply after layout has settled
    // so a late focus/layout pass cannot restore the iOS horizontal offset.
    window.requestAnimationFrame(() => {
      reset();
      window.requestAnimationFrame(reset);
    });
    window.setTimeout(reset, 100);
    window.setTimeout(reset, 300);
  }

  static setupScroll(formsApi) {
    formsApi.onReady(() => {
      FormNavigationScroll.resetScrollPosition();
    });

    formsApi.onStepChange((from, to) => {
      FormNavigationScroll.resetScrollPosition();
    });
  }
}

export default FormNavigationScroll;
