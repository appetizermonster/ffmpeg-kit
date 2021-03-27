import {AbstractSession} from "../AbstractSession";
import {FFmpegKitFactory} from "../FFmpegKitFactory";

export class FFprobeSession extends AbstractSession {

  constructor() {
    super();
  }

  static async create(argumentsArray, executeCallback, logCallback, logRedirectionStrategy) {
    const session = await AbstractSession.createFFprobeSession(argumentsArray, logRedirectionStrategy);
    const sessionId = session.getSessionId();

    FFmpegKitFactory.setExecuteCallback(sessionId, executeCallback);
    FFmpegKitFactory.setLogCallback(sessionId, logCallback);

    return session;
  }

  static fromMap(sessionMap) {
    return AbstractSession.createFFprobeSessionFromMap(sessionMap);
  }

  isFFmpeg() {
    return false;
  }

  isFFprobe() {
    return true;
  }

}
