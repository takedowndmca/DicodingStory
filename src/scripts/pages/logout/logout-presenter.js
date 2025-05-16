import { updateNavbar } from '../../utils/update-navbar';

export default class LogoutPresenter {
  constructor(view) {
    this.view = view;
  }

  async afterRender() {
    localStorage.clear();
    updateNavbar();

    document.querySelector('#nav-login')?.classList.remove('d-none');
    document.querySelector('#nav-register')?.classList.remove('d-none');
    document.querySelector('#nav-logout')?.classList.add('d-none');

    window.location.hash = '/';
  }
}
