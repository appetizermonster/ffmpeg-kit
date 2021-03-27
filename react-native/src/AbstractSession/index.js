import {NativeModules} from 'react-native';

import {Session} from "../Session";
import {FFmpegKitFactory} from "../FFmpegKitFactory";
import {ReturnCode} from "../ReturnCode";
import {FFmpegKit} from "../FFmpegKit";
import {FFmpegKitConfig} from "../FFmpegKitConfig";
import {LogRedirectionStrategy} from "../LogRedirectionStrategy";
import {FFmpegSession} from "../FFmpegSession";
import {FFprobeSession} from "../FFprobeSession";
import {MediaInformationSession} from "../MediaInformationSession";
import {MediaInformation} from "../MediaInformation";

const {FFmpegKitReactNativeModule} = NativeModules;

export class AbstractSession extends Session {

  /**
   * Defines how long default "getAll" methods wait, in milliseconds.
   */
  static DEFAULT_TIMEOUT_FOR_ASYNCHRONOUS_MESSAGES_IN_TRANSMIT = 5000;

  /**
   * Session identifier.
   */
  #sessionId;

  /**
   * Date and time the session was created.
   */
  #createTime;

  /**
   * Date and time the session was started.
   */
  #startTime;

  /**
   * Command string.
   */
  #command;

  /**
   * Command arguments as an array.
   */
  #argumentsArray;

  /**
   * Session specific log redirection strategy.
   */
  #logRedirectionStrategy;

  constructor() {
    super();
  }

  static async createFFmpegSession(argumentsArray, logRedirectionStrategy) {
    if (logRedirectionStrategy === undefined) {
      logRedirectionStrategy = FFmpegKitConfig.getLogRedirectionStrategy();
    }

    let nativeSession = await FFmpegKitReactNativeModule.ffmpegSession(argumentsArray);
    let session = new FFmpegSession();

    session.#sessionId = nativeSession.sessionId;
    session.#createTime = FFmpegKitFactory.validDate(nativeSession.createTime);
    session.#startTime = FFmpegKitFactory.validDate(nativeSession.startTime);
    session.#command = nativeSession.command;
    session.#argumentsArray = argumentsArray;
    session.#logRedirectionStrategy = logRedirectionStrategy;

    FFmpegKitFactory.setLogRedirectionStrategy(session.#sessionId, logRedirectionStrategy);

    return session;
  }

  static createFFmpegSessionFromMap(sessionMap) {
    let session = new FFmpegSession();

    session.#sessionId = sessionMap.sessionId;
    session.#createTime = FFmpegKitFactory.validDate(sessionMap.createTime);
    session.#startTime = FFmpegKitFactory.validDate(sessionMap.startTime);
    session.#command = sessionMap.command;
    session.#argumentsArray = FFmpegKit.parseArguments(sessionMap.command);
    session.#logRedirectionStrategy = FFmpegKitFactory.getLogRedirectionStrategy(session.#sessionId);

    return session;
  }

  static async createFFprobeSession(argumentsArray, logRedirectionStrategy) {
    if (logRedirectionStrategy === undefined) {
      logRedirectionStrategy = FFmpegKitConfig.getLogRedirectionStrategy();
    }

    let nativeSession = await FFmpegKitReactNativeModule.ffprobeSession(argumentsArray);
    let session = new FFprobeSession();

    session.#sessionId = nativeSession.sessionId;
    session.#createTime = FFmpegKitFactory.validDate(nativeSession.createTime);
    session.#startTime = FFmpegKitFactory.validDate(nativeSession.startTime);
    session.#command = nativeSession.command;
    session.#argumentsArray = argumentsArray;
    session.#logRedirectionStrategy = logRedirectionStrategy;

    FFmpegKitFactory.setLogRedirectionStrategy(session.#sessionId, logRedirectionStrategy);

    return session;
  }

  static createFFprobeSessionFromMap(sessionMap) {
    let session = new FFprobeSession();

    session.#sessionId = sessionMap.sessionId;
    session.#createTime = FFmpegKitFactory.validDate(sessionMap.createTime);
    session.#startTime = FFmpegKitFactory.validDate(sessionMap.startTime);
    session.#command = sessionMap.command;
    session.#argumentsArray = FFmpegKit.parseArguments(sessionMap.command);
    session.#logRedirectionStrategy = FFmpegKitFactory.getLogRedirectionStrategy(session.#sessionId);

    return session;
  }

  static async createMediaInformationSession(argumentsArray) {
    let nativeSession = await FFmpegKitReactNativeModule.mediaInformationSession(argumentsArray);
    let session = new MediaInformationSession();

    session.#sessionId = nativeSession.sessionId;
    session.#createTime = FFmpegKitFactory.validDate(nativeSession.createTime);
    session.#startTime = FFmpegKitFactory.validDate(nativeSession.startTime);
    session.#command = nativeSession.command;
    session.#argumentsArray = argumentsArray;
    session.#logRedirectionStrategy = LogRedirectionStrategy.NEVER_PRINT_LOGS;

    FFmpegKitFactory.setLogRedirectionStrategy(session.#sessionId, LogRedirectionStrategy.NEVER_PRINT_LOGS);

    return session;
  }

  static createMediaInformationSessionFromMap(sessionMap) {
    let session = new MediaInformationSession();

    session.#sessionId = sessionMap.sessionId;
    session.#createTime = FFmpegKitFactory.validDate(sessionMap.createTime);
    session.#startTime = FFmpegKitFactory.validDate(sessionMap.startTime);
    session.#command = sessionMap.command;
    session.#argumentsArray = FFmpegKit.parseArguments(sessionMap.command);
    session.#logRedirectionStrategy = LogRedirectionStrategy.NEVER_PRINT_LOGS;

    if (sessionMap.mediaInformation !== undefined && sessionMap.mediaInformation !== null) {
      session.setMediaInformation(new MediaInformation(sessionMap.mediaInformation));
    }

    return session;
  }

  getExecuteCallback() {
    return FFmpegKitFactory.getExecuteCallback(this.getSessionId())
  }

  getLogCallback() {
    return FFmpegKitFactory.getLogCallback(this.getSessionId())
  }

  getSessionId() {
    return this.#sessionId;
  }

  getCreateTime() {
    return this.#createTime;
  }

  getStartTime() {
    return this.#startTime;
  }

  async getEndTime() {
    const endTime = FFmpegKitReactNativeModule.abstractSessionGetEndTime(this.getSessionId());
    return FFmpegKitFactory.validDate(endTime);
  }

  getDuration() {
    return FFmpegKitReactNativeModule.abstractSessionGetDuration(this.getSessionId());
  }

  getArguments() {
    return this.#argumentsArray;
  }

  getCommand() {
    return this.#command;
  }

  async getAllLogs(waitTimeout) {
    const allLogs = await FFmpegKitReactNativeModule.abstractSessionGetAllLogs(this.getSessionId(), FFmpegKitFactory.optionalNumericParameter(waitTimeout));
    return allLogs.map(FFmpegKitFactory.mapToLog);
  }

  async getLogs() {
    const logs = await FFmpegKitReactNativeModule.abstractSessionGetLogs(this.getSessionId());
    return logs.map(FFmpegKitFactory.mapToLog);
  }

  async getAllLogsAsString(waitTimeout) {
    return FFmpegKitReactNativeModule.abstractSessionGetAllLogsAsString(this.getSessionId(), FFmpegKitFactory.optionalNumericParameter(waitTimeout));
  }

  async getLogsAsString() {
    let logs = await this.getLogs();

    let concatenatedString = '';

    logs.forEach(log => concatenatedString += log.getMessage());

    return concatenatedString;
  }

  async getOutput() {
    return this.getAllLogsAsString();
  }

  async getState() {
    return FFmpegKitReactNativeModule.abstractSessionGetState(this.getSessionId());
  }

  async getReturnCode() {
    const returnCodeValue = await FFmpegKitReactNativeModule.abstractSessionGetReturnCode(this.getSessionId());
    if (returnCodeValue === undefined) {
      return undefined;
    } else {
      return new ReturnCode(returnCodeValue);
    }
  }

  getFailStackTrace() {
    return FFmpegKitReactNativeModule.abstractSessionGetFailStackTrace(this.getSessionId());
  }

  getLogRedirectionStrategy() {
    return this.#logRedirectionStrategy;
  }

  thereAreAsynchronousMessagesInTransmit() {
    return FFmpegKitReactNativeModule.abstractSessionThereAreAsynchronousMessagesInTransmit(this.getSessionId());
  }

  isFFmpeg() {
    return false;
  }

  isFFprobe() {
    return false;
  }

  cancel() {
    if (sessionId === undefined) {
      return FFmpegKitReactNativeModule.cancel();
    } else {
      return FFmpegKitReactNativeModule.cancelSession(sessionId);
    }
  }

}
