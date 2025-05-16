import routes from '../routes/routes';
import { getActiveRoute } from '../routes/url-parser';

import { isServiceWorkerAvailable } from '../utils';
import {
  isCurrentPushSubscriptionAvailable,
  subscribe,
  unsubscribe,
} from '../utils/notification-helper';

class App {
  #content = null;
  #drawerButton = null;
  #navigationDrawer = null;
  #notifListenerAdded = false;

  constructor({ navigationDrawer, drawerButton, content }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#navigationDrawer = navigationDrawer;

    this._setupDrawer();
  }

  _setupDrawer() {
    this.#drawerButton.addEventListener('click', () => {
      this.#navigationDrawer.classList.toggle('open');
    });

    document.body.addEventListener('click', (event) => {
      if (
        !this.#navigationDrawer.contains(event.target) &&
        !this.#drawerButton.contains(event.target)
      ) {
        this.#navigationDrawer.classList.remove('open');
      }

      this.#navigationDrawer.querySelectorAll('a').forEach((link) => {
        if (link.contains(event.target)) {
          this.#navigationDrawer.classList.remove('open');
        }
      });
    });
  }

  async #setupPushNotification() {
    if (this.#notifListenerAdded) return;

    const notifButton = document.getElementById('nav-notification');
    if (!notifButton) return;

    const updateNotifUI = async () => {
      const isSubscribed = await isCurrentPushSubscriptionAvailable();
      notifButton.textContent = isSubscribed
        ? '🔕 Nonaktifkan Notifikasi'
        : '🔔 Aktifkan Notifikasi';
    };

    notifButton.addEventListener('click', async (e) => {
      e.preventDefault();
      const isSubscribed = await isCurrentPushSubscriptionAvailable();

      if (isSubscribed) {
        await unsubscribe();
      } else {
        await subscribe();
      }

      await updateNotifUI();
    });

    await updateNotifUI();
    this.#notifListenerAdded = true;
  }

  async renderPage() {
    const url = getActiveRoute();
    const page = routes[url];

    let transitionName = 'halaman-fade';
    if (url === '#/add') {
      transitionName = 'halaman-fade';
    } else if (url === '#/register') {
      transitionName = 'halaman-slide';
    } else if (url === '#/login') {
      transitionName = 'halaman-fade';
    }

    this.#content.style.viewTransitionName = transitionName;

    this.#content.classList.add(transitionName);

    if (document.startViewTransition) {
      document.startViewTransition(async () => {
        this.#content.innerHTML = await page.render();
        await page.afterRender();

        this.#content.classList.add('show');
      });
    } else {
      this.#content.innerHTML = await page.render();
      await page.afterRender();
    }
    const mainContent = document.querySelector('#main-content');
    const skipLink = document.querySelector('.skip-link');
    skipLink.addEventListener('click', function (event) {
      event.preventDefault();
      skipLink.blur();
      mainContent.focus();
      mainContent.scrollIntoView();
    });

    if (isServiceWorkerAvailable()) {
      this.#setupPushNotification();
    }
  }
}

export default App;
