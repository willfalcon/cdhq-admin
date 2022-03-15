import { parse, isPast } from 'date-fns';

import './scripts/polyfills';
import { createCookie, getCookie, getMeta } from './scripts/utils.js';

async function initAlert() {
  const root = getMeta('cdhq-site-root');
  const optionsRes = await fetch(`${root}/wp-json/acf/v3/options/options`);
  const options = await optionsRes.json();
  console.log(options);

  const {
    acf: { activate_alert, alert_button, alert_delay, alert_text, cookie_id, alert_color, alert_expiration },
  } = options;

  const expiration = alert_expiration ? parse(alert_expiration, 'dd/MM/yyyy hh:mm a', new Date()) : null;
  const now = new Date();

  const expirationPassed = expiration ? isPast(expiration) : false;

  const button = alert_button
    ? `
    <a class="cdhq-alert__button" href="${alert_button.url}" target="${alert_button.target}">
      ${alert_button.title}
    </a>
  `
    : ``;
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
  if (activate_alert && !getCookie(cookie_id) && !expirationPassed) {
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
