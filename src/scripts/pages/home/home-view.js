export default class HomeView {
  static render() {
    return `
      <section id="story-section" class="story-section" tabindex="-1" aria-label="Daftar Cerita">
        <h2>Stories</h2>
        <div id="story-list"></div>
        <button class="add-story-button" onclick="window.location.hash='/add'">+ Tambah Cerita</button>
      </section>
    `;
  }

  get storyListElement() {
    return document.getElementById('story-list');
  }

  setupSkipLink() {
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      skipLink.addEventListener('click', (event) => {
        event.preventDefault();
        const target = document.getElementById('story-section');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          target.focus();
          console.log('Skip to content success: target focused');
        } else {
          console.warn('Target #story-section NOT FOUND');
        }
      });
    }
  }

  showError(message) {
    this.storyListElement.innerHTML = `
      <div class="message-card">
        <p>${message}</p>
      </div>`;
  }

  truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  }

  renderStories(stories) {
    this.storyListElement.innerHTML = `
      <div id="story-grid" class="story-grid">
        ${stories
          .map(
            (story) => `
            <div class="story-card" data-id="${story.id}" aria-label="Buka cerita ${story.name}" tabindex="0">
              <img src="${story.photoUrl}" alt="${story.name}, ${story.description}" class="story-image" />
              <div class="story-content">
                <h3>${this.truncateText(story.name, 30)}</h3>
                <p>${this.truncateText(story.description, 25)}</p>
                <p><strong>Lokasi:</strong> ${story.lat}, ${story.lon}</p>
              </div>
            </div>
          `,
          )
          .join('')}
      </div>
    `;

    this.storyListElement.querySelectorAll('.story-card').forEach((item) => {
      const storyId = item.getAttribute('data-id');

      const goToDetail = () => {
        window.location.hash = `/story/${storyId}`;
      };

      item.addEventListener('click', goToDetail);
      item.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          goToDetail();
        }
      });
    });
  }
}
