import '../styles/styles.css';

import App from './pages/app';
import Camera from './utils/camera';
import { updateNavbar } from './utils/update-navbar.js';

import { registerServiceWorker } from './utils';

document.addEventListener('DOMContentLoaded', async () => {
  updateNavbar();
  const app = new App({
    content: document.querySelector('#main-content'),
    drawerButton: document.querySelector('#drawer-button'),
    navigationDrawer: document.querySelector('#navigation-drawer'),
  });
  await app.renderPage();

  await registerServiceWorker();

  console.log('ok');

  window.addEventListener('hashchange', async () => {
    Camera.stopAllStreams();
    await app.renderPage();
    await app.renderPage();
  });
});
