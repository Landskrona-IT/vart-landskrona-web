const REFLOW_DELAYS = [0, 100, 300, 750, 1500];

/**
 * WKWebView can report its final width shortly after the page and Lime form
 * have mounted. Re-dispatching resize after those points lets Lime recalculate
 * any dimensions captured during its initial render.
 */
export function scheduleLayoutRefresh() {
  REFLOW_DELAYS.forEach((delay) => {
    window.setTimeout(() => {
      window.requestAnimationFrame(() => {
        // Reading the width makes the browser flush pending style/layout work
        // before third-party resize listeners run.
        void document.documentElement.clientWidth;
        window.dispatchEvent(new Event('resize'));
      });
    }, delay);
  });
}
