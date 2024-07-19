import { parse, isPast } from 'date-fns';

// import './polyfills.js';
import { createCookie, getCookie, getMeta } from './utils.js';

async function initAlert() {
  const root = getMeta('cdhq-site-root');
  const optionsRes = await fetch(`${root}/wp-json/cdhq/v1/alert`);
  const options = await optionsRes.json();

  const { activated, button, delay, text, id, color, expiration } = options;
  // console.log(options);

  const expires = expiration ? parse(expiration, 'dd/MM/yyyy hh:mm a', new Date()) : null;
  const now = new Date();

  const expirationPassed = expires ? isPast(expires) : false;

  const buttonHtml = button
    ? `
    <a class="cdhq-alert__button" href="${button.url}" target="${button.target}">
      ${button.title}
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
    <div class="cdhq-alert"${color ? `style="background: ${color};"` : ``}>
      <div class="cdhq-alert__text">
        ${text}
      </div>
      ${buttonHtml} 
      ${close}
    </div>
  `;
  if (activated && !getCookie(id) && !expirationPassed) {
    setTimeout(() => {
      document.body.insertAdjacentHTML('afterbegin', alert);
      const alertEl = document.querySelector('.cdhq-alert');
      setTimeout(() => {
        alertEl.style.transform = `translateX(-50%) translateY(0%)`;
      }, 0);
      attachListeners(alertEl, id);
    }, parseInt(delay) * 1000);
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
