import {FFprobeSession} from "../FFprobeSession";
import {AbstractSession} from "../AbstractSession";
import {FFmpegKitFactory} from "../FFmpegKitFactory";

export class MediaInformationSession extends FFprobeSession {
  #mediaInformation;

  constructor() {
    super();
  }

  static async create(argumentsArray, executeCallback, logCallback) {
    const session = await AbstractSession.createMediaInformationSession(argumentsArray);
    const sessionId = session.getSessionId();

    FFmpegKitFactory.setExecuteCallback(sessionId, executeCallback);
    FFmpegKitFactory.setLogCallback(sessionId, logCallback);

    return session;
  }

  static fromMap(sessionMap) {
    return AbstractSession.createMediaInformationSessionFromMap(sessionMap);
  }

  getMediaInformation() {
    return this.#mediaInformation;
  }

  setMediaInformation(mediaInformation) {
    this.#mediaInformation = mediaInformation;
  }

}
