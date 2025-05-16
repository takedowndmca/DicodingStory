import BookmarkPresenter from './bookmark-presenter.js';

class BookmarkPage {
  async render() {
    return `
    <section class="bookmark-section">
      <h2>Bookmark</h2>
      <div id="bookmark-list"></div>
    </section>
  `;
  }

  async afterRender() {
    const presenter = new BookmarkPresenter();
    await presenter.init();
  }
}

export default BookmarkPage;
