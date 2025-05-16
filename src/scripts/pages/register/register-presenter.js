export default class RegisterPresenter {
  constructor(view) {
    this.view = view;
  }

  async afterRender() {
    this.view.form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = this.view.getName();
      const email = this.view.getEmail();
      const password = this.view.getPassword();

      this.view.showMessage('');
      this.view.disableButton();

      try {
        const response = await fetch(
          'https://story-api.dicoding.dev/v1/register',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
          },
        );

        const result = await response.json();
        this.view.showMessage(result.message);

        if (!result.error) {
          window.location.hash = '#/login';
        }
      } catch (error) {
        this.view.showMessage('Error: ' + error.message);
      } finally {
        this.view.enableButton();
      }
    });
  }
}
