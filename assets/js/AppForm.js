import MobileAppManager from './MobileAppManager';
import FormNavigationManager from './FormNavigationManager';

class AppForm {

  static initialize() {
      const template  = document.getElementById('lime-form-template');
      const clone     = document.importNode(template.content, true);

      const targetElement = clone.querySelector('#lime-form');
      if (targetElement) {
        targetElement.setAttribute(
          'form-id',
          MobileAppManager.formId()
        );
      } else {
        console.error("Error: Could not find form template.");
      }

      const appElement = document.getElementById('app');

      console.log('[INFO] finding app element...', appElement);

      if (appElement) {
        appElement.appendChild(clone);

        FormNavigationManager.initialize();
      } else {
        console.error("Error: Could not find app container.");
      }
  }
}

export default AppForm;