import {FFmpegSession} from "../FFmpegSession";
import {FFprobeSession} from "../FFprobeSession";
import {Log} from "../Log";
import {Statistics} from "../Statistics";
import {MediaInformationSession} from "../MediaInformationSession";

const executeCallbackMap = new Map()
const logCallbackMap = new Map()
const statisticsCallbackMap = new Map()
const logRedirectionStrategyMap = new Map()

export class FFmpegKitFactory {

  static #logCallback = undefined;
  static #statisticsCallback = undefined;
  static #executeCallback = undefined;
  static #activeLogLevel = undefined;

  static mapToStatistics(statisticsMap) {
    if (statisticsMap !== undefined) {
      return new Statistics(
        statisticsMap.sessionId,
        statisticsMap.videoFrameNumber,
        statisticsMap.videoFps,
        statisticsMap.videoQuality,
        statisticsMap.size,
        statisticsMap.time,
        statisticsMap.bitrate,
        statisticsMap.speed
      );
    } else {
      return undefined;
    }
  }

  static mapToLog(logMap) {
    if (logMap !== undefined) {
      return new Log(logMap.sessionId, logMap.level, logMap.message)
    } else {
      return undefined;
    }
  }

  static mapToSession(sessionMap) {
    if (sessionMap !== undefined) {
      switch (sessionMap.type) {
        case 2:
          return FFprobeSession.fromMap(sessionMap);
        case 3:
          return MediaInformationSession.fromMap(sessionMap);
        case 1:
        default:
          return FFmpegSession.fromMap(sessionMap);
      }
    } else {
      return undefined;
    }
  }

  static getVersion() {
    return "4.5";
  }

  static getLogRedirectionStrategy(sessionId) {
    return logRedirectionStrategyMap.get(sessionId);
  }

  static setLogRedirectionStrategy(sessionId, logRedirectionStrategy) {
    logRedirectionStrategyMap.set(sessionId, logRedirectionStrategy);
  }

  static getLogCallback(sessionId) {
    return logCallbackMap.get(sessionId);
  }

  static setLogCallback(sessionId, logCallback) {
    if (logCallback !== undefined) {
      logCallbackMap.set(sessionId, logCallback);
    }
  }

  static getGlobalLogCallback() {
    return this.#logCallback;
  }

  static setGlobalLogCallback(logCallback) {
    this.#logCallback = logCallback;
  }

  static getStatisticsCallback(sessionId) {
    return statisticsCallbackMap.get(sessionId);
  }

  static setStatisticsCallback(sessionId, statisticsCallback) {
    if (statisticsCallback !== undefined) {
      statisticsCallbackMap.set(sessionId, statisticsCallback);
    }
  }

  static getGlobalStatisticsCallback() {
    return this.#statisticsCallback;
  }

  static setGlobalStatisticsCallback(statisticsCallback) {
    this.#statisticsCallback = statisticsCallback;
  }

  static getExecuteCallback(sessionId) {
    return executeCallbackMap.get(sessionId);
  }

  static setExecuteCallback(sessionId, executeCallback) {
    if (executeCallback !== undefined) {
      executeCallbackMap.set(sessionId, executeCallback);
    }
  }

  static getGlobalExecuteCallback() {
    return this.#executeCallback;
  }

  static setGlobalExecuteCallback(executeCallback) {
    this.#executeCallback = executeCallback;
  }

  static setLogLevel(logLevel) {
    this.#activeLogLevel = logLevel;
  }

  static getLogLevel() {
    return this.#activeLogLevel;
  }

  static optionalNumericParameter(value) {
    return value ?? -1;
  }

  static validDate(time) {
    if (time === undefined || time === null || time <= 0) {
      return undefined;
    } else {
      return new Date(time);
    }
  }

}
