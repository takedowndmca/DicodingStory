import IDBHelper from '../../data/database';
import BookmarkView from './bookmark-view.js';

class BookmarkPresenter {
  constructor() {
    this.view = new BookmarkView();
  }

  async init() {
    const bookmarks = await IDBHelper.getAllBookmarks();
    this.view.render(bookmarks);
  }
}

export default BookmarkPresenter;
