import '../../../styles/pages/add.css';
import 'leaflet/dist/leaflet.css';

const AddView = {
  render() {
    return `
      <section class="add-story-section">
        <h2>Tambah Cerita Baru</h2>
        <form class="add-form" id="add-form">
          <label for="description">Deskripsi:</label>
          <textarea id="description" name="description" required></textarea>

          <label for="photo">Ambil Gambar dengan Kamera:</label>
          <video id="webcam" autoplay playsinline></video>
          <canvas id="snapshot" style="display: none;"></canvas>
          <button type="button" id="capture-button">Ambil Gambar</button>
          <button type="button" id="toggle-camera-button">Nyalakan Kamera</button>

          <label>Preview Gambar:</label>
          <img id="image-preview" alt="Preview hasil kamera" style="display: none;" />

          <input type="hidden" id="lat" name="lat" />
          <input type="hidden" id="lon" name="lon" />

          <label>Ambil Lokasi (Klik di Peta):</label>
          <div id="map" class="add-story-map"></div>

          <button type="submit" id="submit-button">Kirim</button>
          <div id="loading-indicator" style="display: none;">Mengirim...</div>
        </form>
      </section>
    `;
  },

  getElements() {
    return {
      webcam: document.getElementById('webcam'),
      snapshot: document.getElementById('snapshot'),
      preview: document.getElementById('image-preview'),
      captureBtn: document.getElementById('capture-button'),
      toggleCameraBtn: document.getElementById('toggle-camera-button'),
      form: document.getElementById('add-form'),
      submitButton: document.getElementById('submit-button'),
      loadingIndicator: document.getElementById('loading-indicator'),
      latInput: document.getElementById('lat'),
      lonInput: document.getElementById('lon'),
    };
  },
};

export default AddView;
