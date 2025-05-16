import LoginView from './login-view';
import LoginPresenter from './login-presenter';

export default class LoginPage {
  async render() {
    return LoginView.render();
  }

  async afterRender() {
    const view = new LoginView();
    const presenter = new LoginPresenter(view);
    await presenter.afterRender();
  }
}
