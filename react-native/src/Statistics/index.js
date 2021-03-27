export class Statistics {
  #sessionId;
  #videoFrameNumber;
  #videoFps;
  #videoQuality;
  #size;
  #time;
  #bitrate;
  #speed;

  constructor(sessionId, videoFrameNumber, videoFps, videoQuality, size, time, bitrate, speed) {
    this.#sessionId = sessionId;
    this.#videoFrameNumber = videoFrameNumber;
    this.#videoFps = videoFps;
    this.#videoQuality = videoQuality;
    this.#size = size;
    this.#time = time;
    this.#bitrate = bitrate;
    this.#speed = speed;
  }

  getSessionId() {
    return this.#sessionId;
  }

  setSessionId(sessionId) {
    this.#sessionId = sessionId;
  }

  getVideoFrameNumber() {
    return this.#videoFrameNumber;
  }

  setVideoFrameNumber(videoFrameNumber) {
    this.#videoFrameNumber = videoFrameNumber;
  }

  getVideoFps() {
    return this.#videoFps;
  }

  setVideoFps(videoFps) {
    this.#videoFps = videoFps;
  }

  getVideoQuality() {
    return this.#videoQuality;
  }

  setVideoQuality(videoQuality) {
    this.#videoQuality = videoQuality;
  }

  getSize() {
    return this.#size;
  }

  setSize(size) {
    this.#size = size;
  }

  getTime() {
    return this.#time;
  }

  setTime(time) {
    this.#time = time;
  }

  getBitrate() {
    return this.#bitrate;
  }

  setBitrate(bitrate) {
    this.#bitrate = bitrate;
  }

  getSpeed() {
    return this.#speed;
  }

  setSpeed(speed) {
    this.#speed = speed;
  }

}
