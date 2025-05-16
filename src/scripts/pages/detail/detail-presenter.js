import CONFIG from '../../config';
import { getToken } from '../../utils';

import IDBHelper from '../../data/database';

export default class DetailPresenter {
  constructor(view) {
    this.view = view;
  }

  _setupBookmarkButton(data) {
    const bookmarkBtn = document.querySelector('#bookmark-button');

    IDBHelper.getBookmark(data.id).then((isBookmarked) => {
      bookmarkBtn.textContent = isBookmarked ? 'Hapus Bookmark' : 'Bookmark';

      bookmarkBtn.addEventListener('click', async () => {
        if (isBookmarked) {
          await IDBHelper.deleteBookmark(data.id);
          bookmarkBtn.textContent = 'Bookmark';
        } else {
          await IDBHelper.saveBookmark(data);
          bookmarkBtn.textContent = 'Hapus Bookmark';
        }
      });
    });
  }

  async afterRender() {
    const url = window.location.hash;
    const storyId = url.split('/')[2];
    const token = getToken();

    if (!token) {
      this.view.showError('You need to log in to view details.');
      return;
    }

    this.view.showLoading();
    try {
      const response = await fetch(`${CONFIG.BASE_URL}/stories/${storyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      this.view.hideLoading();

      if (!result.error) {
        const story = result.story;
        const detailHtml = `
            <button id="bookmark-button">Bookmark</button>
          <img src="${story.photoUrl}" alt="${story.name}" class="detail-image" />
          <h3>${story.name}</h3>
          <p>${story.description}</p>
          <p><strong>Lokasi:</strong> ${story.lat}, ${story.lon}</p>
          <div id="map-detail" style="height: 300px; margin-top: 20px;"></div>
        `;

        this.view.showDetail(detailHtml);

        if (story.lat && story.lon) {
          this.view.renderMap(
            story.lat,
            story.lon,
            story.name,
            story.description,
          );
        }
        this._setupBookmarkButton(story);
      } else {
        this.view.showError(result.message);
      }
    } catch (error) {
      this.view.hideLoading();
      this.view.showError(`Error: ${error.message}`);
    }
  }
}
