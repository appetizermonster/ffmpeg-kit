import {AbstractSession} from "../AbstractSession";
import {NativeModules} from "react-native";
import {FFmpegKitFactory} from "../FFmpegKitFactory";

const {FFmpegKitReactNativeModule} = NativeModules;

export class FFmpegSession extends AbstractSession {

  constructor() {
    super();
  }

  static async create(argumentsArray, executeCallback, logCallback, statisticsCallback, logRedirectionStrategy) {
    const session = await AbstractSession.createFFmpegSession(argumentsArray, logRedirectionStrategy);
    const sessionId = session.getSessionId();

    FFmpegKitFactory.setExecuteCallback(sessionId, executeCallback);
    FFmpegKitFactory.setLogCallback(sessionId, logCallback);
    FFmpegKitFactory.setStatisticsCallback(sessionId, statisticsCallback);

    return session;
  }

  static fromMap(sessionMap) {
    return AbstractSession.createFFmpegSessionFromMap(sessionMap);
  }

  getStatisticsCallback() {
    return FFmpegKitFactory.getStatisticsCallback(this.getSessionId());
  }

  async getAllStatistics(waitTimeout) {
    const allStatistics = await FFmpegKitReactNativeModule.ffmpegSessionGetAllStatistics(this.getSessionId(), FFmpegKitFactory.optionalNumericParameter(waitTimeout));
    return allStatistics.map(FFmpegKitFactory.mapToStatistics);
  }

  async getStatistics() {
    const statistics = await FFmpegKitReactNativeModule.ffmpegSessionGetStatistics(this.getSessionId());
    return statistics.map(FFmpegKitFactory.mapToStatistics);
  }

  async getLastReceivedStatistics() {
    let statistics = await this.getStatistics();

    if (statistics.length > 0) {
      return statistics[0];
    } else {
      return undefined;
    }
  }

  isFFmpeg() {
    return true;
  }

  isFFprobe() {
    return false;
  }

}
