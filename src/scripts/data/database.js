import { openDB } from 'idb';

const DB_NAME = 'dicodingstory-database';
const STORE_NAME = 'story-bookmarks';

const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    db.createObjectStore(STORE_NAME, { keyPath: 'id' });
  },
});

const IDBHelper = {
  async getAllBookmarks() {
    return (await dbPromise).getAll(STORE_NAME);
  },
  async getBookmark(id) {
    return (await dbPromise).get(STORE_NAME, id);
  },
  async saveBookmark(item) {
    return (await dbPromise).put(STORE_NAME, item);
  },
  async deleteBookmark(id) {
    return (await dbPromise).delete(STORE_NAME, id);
  },
};

export default IDBHelper;
