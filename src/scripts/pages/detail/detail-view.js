import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default class DetailView {
  static render() {
    return `
      <section class="detail-story-section">
      <h2>Detail Cerita</h2>
        <div id="loading" class="loading-indicator">Loading...</div>
        <div id="story-detail" class="story-detail-container" style="display: none;"></div>
      </section>
    `;
  }

  get detailContainer() {
    return document.getElementById('story-detail');
  }

  get loadingIndicator() {
    return document.getElementById('loading');
  }

  showLoading() {
    this.loadingIndicator.style.display = 'block';
  }

  hideLoading() {
    this.loadingIndicator.style.display = 'none';
  }

  showDetail(content) {
    this.detailContainer.innerHTML = content;
    this.detailContainer.style.display = 'block';
  }

  showError(message) {
    this.showDetail(`<p>${message}</p>`);
  }

  renderMap(lat, lon, name, description) {
    const map = L.map('map-detail').setView([lat, lon], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    const marker = L.marker([lat, lon]).addTo(map);
    marker.bindPopup(`<strong>${name}</strong><br>${description}`).openPopup();
  }
}
