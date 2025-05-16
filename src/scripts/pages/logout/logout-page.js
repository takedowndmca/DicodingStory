import LogoutView from './logout-view.js';
import LogoutPresenter from './logout-presenter.js';

export default class LogoutPage {
  async render() {
    return LogoutView.render();
  }

  async afterRender() {
    const view = new LogoutView();
    const presenter = new LogoutPresenter(view);
    await presenter.afterRender();
  }
}
