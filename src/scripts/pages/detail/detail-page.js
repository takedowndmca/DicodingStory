import '../../../styles/pages/detail.css';
import DetailView from './detail-view';
import DetailPresenter from './detail-presenter';

export default class DetailPage {
  async render() {
    return DetailView.render();
  }

  async afterRender() {
    const view = new DetailView();
    const presenter = new DetailPresenter(view);
    await presenter.afterRender();
  }
}
