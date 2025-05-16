class Camera {
  static activeStream = null;

  static addNewStream(stream) {
    Camera.activeStream = stream;
  }

  static hasActiveStream() {
    return Camera.activeStream !== null;
  }

  static stopAllStreams() {
    if (Camera.activeStream) {
      Camera.activeStream.getTracks().forEach((track) => track.stop());
      Camera.activeStream = null;
    }
  }
}

export default Camera;
