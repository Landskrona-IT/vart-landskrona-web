import MobileAppManager from './MobileAppManager';
import FormNavigationManager from './FormNavigationManager';
import { scheduleLayoutRefresh } from './LayoutRefresh';

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

        // Lime mounts asynchronously. iOS WKWebView may only know its final
        // width after the screen transition has completed.
        scheduleLayoutRefresh();
        FormNavigationManager.initialize();
      } else {
        console.error("Error: Could not find app container.");
      }
  }
}

export default AppForm;
