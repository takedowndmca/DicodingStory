import HomeView from './home-view';
import HomePresenter from './home-presenter';

export default class HomePage {
  async render() {
    return HomeView.render();
  }

  async afterRender() {
    const view = new HomeView();
    const presenter = new HomePresenter(view);
    await presenter.afterRender();
  }
}
