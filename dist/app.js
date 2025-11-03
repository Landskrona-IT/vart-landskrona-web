/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// CONCATENATED MODULE: ./assets/js/AppData.js
const urlParams = new URLSearchParams(window.location.search);
const formIdWebParam = urlParams.get("formIdWeb");
const formIdAppParam = urlParams.get("formIdApp");
const AppData = {
  urls: {
    ios: "https://apps.apple.com/se/app/ett-b%C3%A4ttre-helsingborg/id1061079182",
    android: "https://play.google.com/store/apps/details?id=se.helsingborg.EttBattreHelsingborg&hl=sv",
    noLink: "#nolink"
  },
  formIds: {
    app: formIdAppParam || "DI6su97z1SAALJXZBxYA",
    web: formIdWebParam || "DI6su97z1SAALJXZBxYA"
  }
};
/* harmony default export */ const js_AppData = (AppData);
;// CONCATENATED MODULE: ./assets/js/MobileAppManager.js

class MobileAppManager {
  static setClassAndAria(element) {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (this.isAndroid(userAgent) || this.isIOS(userAgent)) {
      element.classList.remove("u-display--none");
      element.removeAttribute("aria-hidden");
    }
  }
  static setLink(element) {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (this.isAndroid(userAgent) || this.isIOS(userAgent)) {
      element.setAttribute("href", this.appUrl());
    }
  }
  static isAndroid(userAgent) {
    return /android/i.test(userAgent);
  }
  static isIOS(userAgent) {
    return /iPad|iPhone|iPod/i.test(userAgent);
  }
  static isApp() {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get('app') === '1';
  }
  static appUrl() {
    if (this.isIOS()) {
      return js_AppData.urls.ios;
    }
    if (this.isAndroid()) {
      return js_AppData.urls.android;
    }
    return js_AppData.urls.noLink;
  }
  static formId() {
    return MobileAppManager.isApp() ? js_AppData.formIds.app : js_AppData.formIds.web;
  }
}
/* harmony default export */ const js_MobileAppManager = (MobileAppManager);
;// CONCATENATED MODULE: ./assets/js/AppBanner.js

class AppBanner {
  static initialize() {
    window.addEventListener("load", function () {
      const targetElement = document.getElementById("app-banner");
      if (targetElement) {
        js_MobileAppManager.setClassAndAria(targetElement);
      }
    });
    window.addEventListener("load", function () {
      const targetElement = document.getElementById("app-banner-link");
      if (targetElement) {
        js_MobileAppManager.setLink(targetElement);
      }
    });
    window.addEventListener("load", function () {
      const targetElement = document.querySelector('body');
      if (targetElement && js_MobileAppManager.isApp()) {
        targetElement.classList.add('is-app');
      }
    });
  }
}
/* harmony default export */ const js_AppBanner = (AppBanner);
;// CONCATENATED MODULE: ./assets/js/Navigation/Scroll.js
class FormNavigationScroll {
  static setupScroll(formsApi) {
    formsApi.onReady(() => {
      window.scrollTo(0, 0);
    });
    formsApi.onStepChange((from, to) => {
      window.scrollTo(0, 0);
    });
  }
}
/* harmony default export */ const Scroll = (FormNavigationScroll);
;// CONCATENATED MODULE: ./assets/js/Navigation/BackButton.js
class FormNavigationBackButton {
  static setupBackButton(formsApi) {
    formsApi.onReady(() => {
      const backButton = document.getElementById("back-button");
      if (backButton) {
        backButton.addEventListener("click", function (e) {
          e.preventDefault();
          formsApi.goToPrevStep();
        });
      }
    });
  }
}
/* harmony default export */ const BackButton = (FormNavigationBackButton);
;// CONCATENATED MODULE: ./assets/js/Navigation/StepChange.js
class FormNavigationStepChange {
  static setupStepChange(formsApi) {
    formsApi.onStepChange((from, to) => {
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
/* harmony default export */ const StepChange = (FormNavigationStepChange);
;// CONCATENATED MODULE: ./assets/js/Navigation/Submitted.js
class FormNavigationSubmitted {
  static setupSubmitted(formsApi) {
    formsApi.onSubmitted(() => {
      window.scrollTo(0, 0);
      const backButton = document.getElementById("back-button");
      if (backButton) {
        backButton.classList.add("u-display--none");
        backButton.setAttribute('aria-hidden', "true");
      }
      const cancelButton = document.getElementById("cancel-button");
      if (cancelButton) {
        cancelButton.classList.add("u-display--none");
        cancelButton.setAttribute('aria-hidden', "true");
      }
      const closeButton = document.getElementById("close-button");
      if (closeButton) {
        closeButton.classList.remove("u-display--none");
        closeButton.removeAttribute('aria-hidden');
      }
    });
  }
}
/* harmony default export */ const Submitted = (FormNavigationSubmitted);
;// CONCATENATED MODULE: ./assets/js/Navigation/Reload.js
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class FormNavigationReloadFunctions {}
_defineProperty(FormNavigationReloadFunctions, "isValidUrl", function (url) {
  const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;
  return urlRegex.test(url);
});
_defineProperty(FormNavigationReloadFunctions, "reloadPage", function (url) {
  if (url && this.isValidUrl(url)) {
    (opener || parent || window).location.href = url;
    return;
  }
  (opener || parent || window).location.reload();
});
/* harmony default export */ const Reload = (FormNavigationReloadFunctions);
;// CONCATENATED MODULE: ./assets/js/Navigation/CloseCancelButton.js

class FormNavigationButtons {
  static setupCancelAndCloseButtons() {
    const cancelButton = document.getElementById("cancel-button");
    if (cancelButton) {
      cancelButton.addEventListener("click", function (e) {
        e.preventDefault();
        const userConfirmed = window.confirm("Är du säker på att du vill avbryta? All inmatad information förloras.");
        if (userConfirmed == true) {
          var _URLSearchParams$get;
          Reload.reloadPage((_URLSearchParams$get = new URLSearchParams(window.location.search).get("closeUrl")) !== null && _URLSearchParams$get !== void 0 ? _URLSearchParams$get : null);
        }
      });
    }
    const closeButton = document.getElementById("close-button");
    if (closeButton) {
      closeButton.addEventListener("click", function (e) {
        var _URLSearchParams$get2;
        e.preventDefault();
        Reload.reloadPage((_URLSearchParams$get2 = new URLSearchParams(window.location.search).get("closeUrl")) !== null && _URLSearchParams$get2 !== void 0 ? _URLSearchParams$get2 : null);
      });
    }
  }
}
/* harmony default export */ const CloseCancelButton = (FormNavigationButtons);
;// CONCATENATED MODULE: ./assets/js/FormNavigationManager.js





class FormNavigationManager {
  static initialize() {
    const formsApi = window.limeForms.getApi();
    Scroll.setupScroll(formsApi);
    BackButton.setupBackButton(formsApi);
    StepChange.setupStepChange(formsApi);
    Submitted.setupSubmitted(formsApi);
    CloseCancelButton.setupCancelAndCloseButtons();
    formsApi.onReady(function () {
      setTimeout(function () {
        document.querySelector(".loader").remove();
      }, 1000);
    });
  }
}
/* harmony default export */ const js_FormNavigationManager = (FormNavigationManager);
;// CONCATENATED MODULE: ./assets/js/AppForm.js


class AppForm {
  static initialize() {
    const template = document.getElementById('lime-form-template');
    const clone = document.importNode(template.content, true);
    const targetElement = clone.querySelector('#lime-form');
    if (targetElement) {
      targetElement.setAttribute('form-id', js_MobileAppManager.formId());
    } else {
      console.error("Error: Could not find form template.");
    }
    const appElement = document.getElementById('app');
    if (appElement) {
      appElement.appendChild(clone);
      js_FormNavigationManager.initialize();
    } else {
      console.error("Error: Could not find app container.");
    }
  }
}
/* harmony default export */ const js_AppForm = (AppForm);
;// CONCATENATED MODULE: ./assets/js/app.js


js_AppBanner.initialize();
window.addEventListener('load', function () {
  function waitForLimeForms(maxAttempts) {
    let attempts = 0;
    const interval = setInterval(function () {
      if (window.limeForms && typeof window.limeForms.getApi === 'function') {
        clearInterval(interval);
        console.log('[INFO] limeForms loaded, initializing app form...');
        js_AppForm.initialize();
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
/******/ })()
;