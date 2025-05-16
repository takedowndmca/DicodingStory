import AddView from './add-view';
import AddPresenter from './add-presenter';

class AddPage {
  constructor() {
    this.presenter = new AddPresenter(AddView);
  }

  async render() {
    return AddView.render();
  }

  async afterRender() {
    await this.presenter.init();
  }
}

export default AddPage;
