import CONFIG from '../../config';
import Camera from '../../utils/camera';
import { getToken } from '../../utils';
import L from 'leaflet';

L.Icon.Default.mergeOptions({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
});

class AddPresenter {
  constructor(view) {
    this.view = view;
    this.webcamStream = null;
    this.marker = null;
  }

  async init() {
    const token = getToken();
    if (!token) {
      alert('Silakan login terlebih dahulu.');
      window.location.hash = '/login';
      return;
    }

    this.setupMap();
    this.bindEvents(token);
  }

  bindEvents(token) {
    const el = this.view.getElements();

    el.toggleCameraBtn.textContent = Camera.hasActiveStream()
      ? 'Matikan Kamera'
      : 'Nyalakan Kamera';

    el.captureBtn.addEventListener('click', () => this.captureImage(el));
    el.toggleCameraBtn.addEventListener('click', () => this.toggleCamera(el));

    el.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      el.loadingIndicator.style.display = 'block';

      try {
        const blob = await (
          await fetch(el.snapshot.toDataURL('image/jpeg'))
        ).blob();

        if (blob.size > 1024 * 1024) {
          alert('Ukuran gambar tidak boleh lebih dari 1MB.');
          el.loadingIndicator.style.display = 'none';
          return;
        }

        const formData = new FormData();
        formData.append(
          'description',
          document.getElementById('description').value,
        );
        formData.append('photo', blob, 'snapshot.jpg');

        if (el.latInput.value) formData.append('lat', el.latInput.value);
        if (el.lonInput.value) formData.append('lon', el.lonInput.value);

        const response = await fetch(`${CONFIG.BASE_URL}/stories`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        const result = await response.json();
        if (!result.error) {
          alert('Cerita berhasil ditambahkan!');
          window.location.hash = '/';
        } else {
          alert(result.message);
        }
      } catch (error) {
        alert('Gagal mengirim data: ' + error.message);
      } finally {
        el.loadingIndicator.style.display = 'none';
        this.stopCamera();
      }
    });
  }

  captureImage(el) {
    el.snapshot.width = el.webcam.videoWidth;
    el.snapshot.height = el.webcam.videoHeight;
    const context = el.snapshot.getContext('2d');
    context.clearRect(0, 0, el.snapshot.width, el.snapshot.height);
    context.drawImage(el.webcam, 0, 0, el.snapshot.width, el.snapshot.height);
    const imageData = el.snapshot.toDataURL('image/jpeg');
    el.preview.src = imageData;
    el.preview.style.display = 'block';
  }

  toggleCamera(el) {
    if (Camera.hasActiveStream()) {
      this.stopCamera();
      el.toggleCameraBtn.textContent = 'Nyalakan Kamera';
    } else {
      this.startCamera(el.webcam);
      el.toggleCameraBtn.textContent = 'Matikan Kamera';
    }
  }

  async startCamera(webcam) {
    try {
      this.webcamStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      Camera.addNewStream(this.webcamStream);
      webcam.srcObject = this.webcamStream;
      webcam.style.display = 'block';
    } catch (err) {
      console.error('Gagal akses kamera:', err);
      alert('Tidak dapat mengakses kamera.');
    }
  }

  stopCamera() {
    if (this.webcamStream) {
      this.webcamStream.getTracks().forEach((track) => track.stop());
      this.webcamStream = null;
    }
    Camera.stopAllStreams();
  }

  setupMap() {
    const el = this.view.getElements();
    const map = L.map('map').setView([-6.2, 106.8], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.setView([latitude, longitude], 15);
          this.marker = L.marker([latitude, longitude])
            .addTo(map)
            .bindPopup(
              `Lokasi Anda<br>Lat: ${latitude.toFixed(5)}, Lon: ${longitude.toFixed(5)}`,
            )
            .openPopup();

          el.latInput.value = latitude;
          el.lonInput.value = longitude;
        },
        (error) => {
          console.error('Gagal mendapatkan lokasi:', error);
          alert('Tidak dapat mengambil lokasi saat ini.');
        },
      );
    }

    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      el.latInput.value = lat;
      el.lonInput.value = lng;

      if (this.marker) {
        this.marker
          .setLatLng([lat, lng])
          .bindPopup(`Lat: ${lat.toFixed(5)}, Lon: ${lng.toFixed(5)}`)
          .openPopup();
      } else {
        this.marker = L.marker([lat, lng])
          .addTo(map)
          .bindPopup(`Lat: ${lat.toFixed(5)}, Lon: ${lng.toFixed(5)}`)
          .openPopup();
      }
    });
  }
}

export default AddPresenter;
