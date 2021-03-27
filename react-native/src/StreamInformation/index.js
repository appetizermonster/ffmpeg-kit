export class StreamInformation {

  static KEY_INDEX = "index";
  static KEY_TYPE = "codec_type";
  static KEY_CODEC = "codec_name";
  static KEY_CODEC_LONG = "codec_long_name";
  static KEY_FORMAT = "pix_fmt";
  static KEY_WIDTH = "width";
  static KEY_HEIGHT = "height";
  static KEY_BIT_RATE = "bit_rate";
  static KEY_SAMPLE_RATE = "sample_rate";
  static KEY_SAMPLE_FORMAT = "sample_fmt";
  static KEY_CHANNEL_LAYOUT = "channel_layout";
  static KEY_SAMPLE_ASPECT_RATIO = "sample_aspect_ratio";
  static KEY_DISPLAY_ASPECT_RATIO = "display_aspect_ratio";
  static KEY_AVERAGE_FRAME_RATE = "avg_frame_rate";
  static KEY_REAL_FRAME_RATE = "r_frame_rate";
  static KEY_TIME_BASE = "time_base";
  static KEY_CODEC_TIME_BASE = "codec_time_base";
  static KEY_TAGS = "tags";

  #allProperties;

  constructor(properties) {
    this.#allProperties = properties;
  }

  /**
   * Returns stream index.
   *
   * @return stream index, starting from zero
   */
  getIndex() {
    return this.getNumberProperty(StreamInformation.KEY_INDEX);
  }

  /**
   * Returns stream type.
   *
   * @return stream type; audio or video
   */
  getType() {
    return this.getStringProperty(StreamInformation.KEY_TYPE);
  }

  /**
   * Returns stream codec.
   *
   * @return stream codec
   */
  getCodec() {
    return this.getStringProperty(StreamInformation.KEY_CODEC);
  }

  /**
   * Returns full stream codec.
   *
   * @return stream codec with additional profile and mode information
   */
  getFullCodec() {
    return this.getStringProperty(StreamInformation.KEY_CODEC_LONG);
  }

  /**
   * Returns stream format.
   *
   * @return stream format
   */
  getFormat() {
    return this.getStringProperty(StreamInformation.KEY_FORMAT);
  }

  /**
   * Returns width.
   *
   * @return width in pixels
   */
  getWidth() {
    return this.getNumberProperty(StreamInformation.KEY_WIDTH);
  }

  /**
   * Returns height.
   *
   * @return height in pixels
   */
  getHeight() {
    return this.getNumberProperty(StreamInformation.KEY_HEIGHT);
  }

  /**
   * Returns bitrate.
   *
   * @return bitrate in kb/s
   */
  getBitrate() {
    return this.getStringProperty(StreamInformation.KEY_BIT_RATE);
  }

  /**
   * Returns sample rate.
   *
   * @return sample rate in hz
   */
  getSampleRate() {
    return this.getStringProperty(StreamInformation.KEY_SAMPLE_RATE);
  }

  /**
   * Returns sample format.
   *
   * @return sample format
   */
  getSampleFormat() {
    return this.getStringProperty(StreamInformation.KEY_SAMPLE_FORMAT);
  }

  /**
   * Returns channel layout.
   *
   * @return channel layout
   */
  getChannelLayout() {
    return this.getStringProperty(StreamInformation.KEY_CHANNEL_LAYOUT);
  }

  /**
   * Returns sample aspect ratio.
   *
   * @return sample aspect ratio
   */
  getSampleAspectRatio() {
    return this.getStringProperty(StreamInformation.KEY_SAMPLE_ASPECT_RATIO);
  }

  /**
   * Returns display aspect ratio.
   *
   * @return display aspect ratio
   */
  getDisplayAspectRatio() {
    return this.getStringProperty(StreamInformation.KEY_DISPLAY_ASPECT_RATIO);
  }

  /**
   * Returns display aspect ratio.
   *
   * @return average frame rate in fps
   */
  getAverageFrameRate() {
    return this.getStringProperty(StreamInformation.KEY_AVERAGE_FRAME_RATE);
  }

  /**
   * Returns real frame rate.
   *
   * @return real frame rate in tbr
   */
  getRealFrameRate() {
    return this.getStringProperty(StreamInformation.KEY_REAL_FRAME_RATE);
  }

  /**
   * Returns time base.
   *
   * @return time base in tbn
   */
  getTimeBase() {
    return this.getStringProperty(StreamInformation.KEY_TIME_BASE);
  }

  /**
   * Returns codec time base.
   *
   * @return codec time base in tbc
   */
  getCodecTimeBase() {
    return this.getStringProperty(StreamInformation.KEY_CODEC_TIME_BASE);
  }

  /**
   * Returns all tags.
   *
   * @return tags object
   */
  getTags() {
    return this.getProperties(StreamInformation.KEY_TAGS);
  }

  /**
   * Returns the stream property associated with the key.
   *
   * @param key property key
   * @return stream property as string or undefined if the key is not found
   */
  getStringProperty(key) {
    if (this.#allProperties !== undefined) {
      return this.#allProperties[key];
    } else {
      return undefined;
    }
  }

  /**
   * Returns the stream property associated with the key.
   *
   * @param key property key
   * @return stream property as number or undefined if the key is not found
   */
  getNumberProperty(key) {
    if (this.#allProperties !== undefined) {
      return this.#allProperties[key];
    } else {
      return undefined;
    }
  }

  /**
   * Returns the stream properties associated with the key.
   *
   * @param key properties key
   * @return stream properties as an object or undefined if the key is not found
   */
  getProperties(key) {
    if (this.#allProperties !== undefined) {
      return this.#allProperties[key];
    } else {
      return undefined;
    }
  }

  /**
   * Returns all properties found.
   *
   * @returns an object in which properties can be accessed by property names
   */
  getAllProperties() {
    return this.#allProperties;
  }
}
