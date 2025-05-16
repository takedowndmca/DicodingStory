import { updateNavbar } from '../../utils/update-navbar';

export default class LoginPresenter {
  constructor(view) {
    this.view = view;
  }

  async afterRender() {
    this.view.form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = this.view.getEmail();
      const password = this.view.getPassword();

      this.view.showMessage('');
      this.view.disableButton();

      try {
        const response = await fetch(
          'https://story-api.dicoding.dev/v1/login',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          },
        );

        const result = await response.json();
        this.view.showMessage(result.message);

        if (!result.error) {
          localStorage.setItem('isLoggedIn', true);
          localStorage.setItem('token', result.loginResult.token);
          localStorage.setItem('name', result.loginResult.name);
          localStorage.setItem('userId', result.loginResult.userId);
          updateNavbar();
          window.location.hash = '/';
        }
      } catch (error) {
        this.view.showMessage('Error: ' + error.message);
      } finally {
        this.view.enableButton();
      }
    });
  }
}
