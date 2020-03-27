(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  var createCookie = function (name, value, days) {
    var expires;

    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toGMTString();
    } else {
      expires = '';
    }

    document.cookie = name + '=' + value + expires + '; path=/';
  };

  function getCookie(c_name) {
    var c_start;

    if (document.cookie.length > 0) {
      c_start = document.cookie.indexOf(c_name + '=');

      if (c_start != -1) {
        c_start = c_start + c_name.length + 1;
        c_end = document.cookie.indexOf(';', c_start);

        if (c_end == -1) {
          c_end = document.cookie.length;
        }

        return unescape(document.cookie.substring(c_start, c_end));
      }
    }

    return '';
  }

  function getMeta(metaName) {
    const metas = document.getElementsByTagName('meta');

    for (let i = 0; i < metas.length; i++) {
      if (metas[i].getAttribute('name') === metaName) {
        return metas[i].getAttribute('content');
      }
    }

    return '';
  }

  async function initAlert() {
    const root = getMeta('cdhq-site-root');
    const optionsRes = await fetch(`${root}/wp-json/acf/v3/options/options`);
    const options = await optionsRes.json();
    console.log(options);
    const {
      acf: {
        activate_alert,
        alert_button,
        alert_delay,
        alert_text,
        cookie_id,
        alert_color
      }
    } = options;
    const button = alert_button ? `
    <a class="cdhq-alert__button" href="${alert_button.url}" target="${alert_button.target}">
      ${alert_button.title}
    </a>
  ` : ``;
    const close = `
    <button class="cdhq-alert__close" id="closeAlert" aria-label="Close alert">
      <span></span>
      <span></span>
    </button>
  `;
    const alert = `
    <div class="cdhq-alert"${alert_color ? `style="background: ${alert_color};"` : ``}>
      <div class="cdhq-alert__text">
        ${alert_text}
      </div>
      ${button} 
      ${close}
    </div>
  `;

    if (activate_alert && !getCookie(cookie_id)) {
      setTimeout(() => {
        document.body.insertAdjacentHTML('afterbegin', alert);
        const alertEl = document.querySelector('.cdhq-alert');
        setTimeout(() => {
          alertEl.style.transform = `translateX(-50%) translateY(0%)`;
        }, 0);
        attachListeners(alertEl, cookie_id);
      }, alert_delay * 1000);
    }
  }

  function attachListeners(alert, id) {
    const closeButton = alert.querySelector('#closeAlert');
    closeButton.addEventListener('click', () => {
      alert.addEventListener('transitionend', () => {
        alert.remove();
      });
      alert.style.transform = `translateX(-50%) translateY(-110%)`;
      createCookie(id, true, 7);
    });
  }

  initAlert();

})));
//# sourceMappingURL=bundle.js.map
