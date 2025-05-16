import { getToken } from '../../utils';
import CONFIG from '../../config';

export default class HomePresenter {
  constructor(view) {
    this.view = view;
  }

  async afterRender() {
    this.view.setupSkipLink();

    const token = getToken();
    if (!token) {
      this.view.showError('You need to log in to view stories.');
      return;
    }

    try {
      const response = await fetch(`${CONFIG.BASE_URL}/stories`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!result.error) {
        this.view.renderStories(result.listStory);
      } else {
        this.view.showError(result.message);
      }
    } catch (error) {
      this.view.showError(`Error: ${error.message}`);
    }
  }
}
