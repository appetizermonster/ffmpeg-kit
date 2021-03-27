import {StreamInformation} from "../StreamInformation";

export class MediaInformation {

  static KEY_MEDIA_PROPERTIES = "format";
  static KEY_FILENAME = "filename";
  static KEY_FORMAT = "format_name";
  static KEY_FORMAT_LONG = "format_long_name";
  static KEY_START_TIME = "start_time";
  static KEY_DURATION = "duration";
  static KEY_SIZE = "size";
  static KEY_BIT_RATE = "bit_rate";
  static KEY_TAGS = "tags";

  #allProperties;

  constructor(properties) {
    this.#allProperties = properties;
  }

  /**
   * Returns file name.
   *
   * @return media file name
   */
  getFilename() {
    return this.getStringProperty(MediaInformation.KEY_FILENAME);
  }

  /**
   * Returns format.
   *
   * @return media format
   */
  getFormat() {
    return this.getStringProperty(MediaInformation.KEY_FORMAT);
  }

  /**
   * Returns long format.
   *
   * @return media long format
   */
  getLongFormat() {
    return this.getStringProperty(MediaInformation.KEY_FORMAT_LONG);
  }

  /**
   * Returns duration.
   *
   * @return media duration in milliseconds
   */
  getDuration() {
    return this.getStringProperty(MediaInformation.KEY_DURATION);
  }

  /**
   * Returns start time.
   *
   * @return media start time in milliseconds
   */
  getStartTime() {
    return this.getStringProperty(MediaInformation.KEY_START_TIME);
  }

  /**
   * Returns size.
   *
   * @return media size in bytes
   */
  getSize() {
    return this.getStringProperty(MediaInformation.KEY_SIZE);
  }

  /**
   * Returns bitrate.
   *
   * @return media bitrate in kb/s
   */
  getBitrate() {
    return this.getStringProperty(MediaInformation.KEY_BIT_RATE);
  }

  /**
   * Returns all tags.
   *
   * @return tags dictionary
   */
  getTags() {
    return this.getProperties(MediaInformation.KEY_TAGS);
  }

  /**
   * Returns the streams found as array.
   *
   * @returns StreamInformation array
   */
  getStreams() {
    let list = [];
    let streamList;

    if (this.#allProperties !== undefined) {
      streamList = this.#allProperties.streams;
    }

    if (streamList !== undefined) {
      streamList.forEach((stream) => {
        list.push(new StreamInformation(stream));
      });
    }

    return list;
  }

  /**
   * Returns the media property associated with the key.
   *
   * @param key property key
   * @return media property as string or undefined if the key is not found
   */
  getStringProperty(key) {
    let mediaProperties = this.getMediaProperties();
    if (mediaProperties !== undefined) {
      return mediaProperties[key];
    } else {
      return undefined;
    }
  }

  /**
   * Returns the media property associated with the key.
   *
   * @param key property key
   * @return media property as number or undefined if the key is not found
   */
  getNumberProperty(key) {
    let mediaProperties = this.getMediaProperties();
    if (mediaProperties !== undefined) {
      return mediaProperties[key];
    } else {
      return undefined;
    }
  }

  /**
   * Returns the media properties associated with the key.
   *
   * @param key properties key
   * @return media properties as an object or undefined if the key is not found
   */
  getProperties(key) {
    let mediaProperties = this.getMediaProperties();
    if (mediaProperties !== undefined) {
      return mediaProperties[key];
    } else {
      return undefined;
    }
  }

  /**
   * Returns all media properties.
   *
   * @returns an object where media properties can be accessed by property names
   */
  getMediaProperties() {
    if (this.#allProperties !== undefined) {
      return this.#allProperties.format;
    } else {
      return undefined;
    }
  }

  /**
   * Returns all properties found, including stream properties too.
   *
   * @returns an object in which properties can be accessed by property names
   */
  getAllProperties() {
    return this.#allProperties;
  }
}
