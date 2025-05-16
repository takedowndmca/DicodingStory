import RegisterView from './register-view';
import RegisterPresenter from './register-presenter';

export default class RegisterPage {
  async render() {
    return RegisterView.render();
  }

  async afterRender() {
    const view = new RegisterView();
    const presenter = new RegisterPresenter(view);
    await presenter.afterRender();
  }
}
