import IDBHelper from '../../data/database';
class BookmarkView {
  async render(bookmarks) {
    const container = document.querySelector('#bookmark-list');
    if (!container) return;

    if (bookmarks.length === 0) {
      container.innerHTML = `
    <div class="message-card">
      <p>Tidak ada bookmark.</p>
    </div>
  `;
      return;
    }

    container.innerHTML = bookmarks
      .map(
        (item) =>
          `<div class="bookmark-card" data-id="${item.id}">
        <img src="${item.photoUrl}" alt="${item.name}" class="bookmark-image" />
        <div class="bookmark-content">
          <h3 class="bookmark-title">${item.name}</h3>
          <p class="bookmark-description">${item.description}</p>
          <div class="bookmark-actions">
            <a href="#/story/${item.id}" class="bookmark-link">Lihat Detail</a>
            <button class="delete-bookmark-btn">Hapus</button>
          </div>
        </div>
      </div>`,
      )
      .join('');

    const deleteButtons = container.querySelectorAll('.delete-bookmark-btn');
    deleteButtons.forEach((button) => {
      button.addEventListener('click', async (event) => {
        const card = event.target.closest('.bookmark-card');
        const id = card.dataset.id;

        await IDBHelper.deleteBookmark(id);

        const updatedBookmarks = await IDBHelper.getAllBookmarks();
        this.render(updatedBookmarks);
      });
    });
  }
}

export default BookmarkView;
