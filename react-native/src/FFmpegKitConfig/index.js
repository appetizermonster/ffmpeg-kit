import {NativeModules} from 'react-native';
import {FFmpegKitFactory} from "../FFmpegKitFactory";
import {LogRedirectionStrategy} from "../LogRedirectionStrategy";
import {SessionState} from "../SessionState";

const {FFmpegKitReactNativeModule} = NativeModules;

export class FFmpegKitConfig {

  static #globalLogRedirectionStrategy = LogRedirectionStrategy.PRINT_LOGS_WHEN_NO_CALLBACKS_DEFINED;

  static enableRedirection() {
    return FFmpegKitReactNativeModule.enableRedirection();
  }

  static disableRedirection() {
    return FFmpegKitReactNativeModule.disableRedirection();
  }

  static setFontconfigConfigurationPath(path) {
    return FFmpegKitReactNativeModule.setFontconfigConfigurationPath(path);
  }

  static setFontDirectory(path, mapping) {
    return FFmpegKitReactNativeModule.setFontDirectory(path, mapping);
  }

  static setFontDirectoryList(fontDirectoryList, mapping) {
    return FFmpegKitReactNativeModule.setFontDirectoryList(fontDirectoryList, mapping);
  }

  static registerNewFFmpegPipe() {
    return FFmpegKitReactNativeModule.registerNewFFmpegPipe();
  }

  static closeFFmpegPipe(ffmpegPipePath) {
    return FFmpegKitReactNativeModule.closeFFmpegPipe(ffmpegPipePath);
  }

  static getFFmpegVersion() {
    return FFmpegKitReactNativeModule.getFFmpegVersion();
  }

  static getVersion() {
    return FFmpegKitFactory.getVersion();
  }

  static isLTSBuild() {
    return FFmpegKitReactNativeModule.isLTSBuild();
  }

  static getBuildDate() {
    return FFmpegKitReactNativeModule.getBuildDate();
  }

  static setEnvironmentVariable(name, value) {
    return FFmpegKitReactNativeModule.setEnvironmentVariable(name, value);
  }

  static ignoreSignal(signal) {
    return FFmpegKitReactNativeModule.ignoreSignal(signal);
  }

  static asyncFFmpegExecute(ffmpegSession) {
    return FFmpegKitReactNativeModule.asyncFFmpegSessionExecute(ffmpegSession.getSessionId());
  }

  static asyncFFprobeExecute(ffprobeSession) {
    return FFmpegKitReactNativeModule.asyncFFprobeSessionExecute(ffprobeSession.getSessionId());
  }

  static asyncGetMediaInformationExecute(mediaInformationSession, waitTimeout) {
    return FFmpegKitReactNativeModule.asyncMediaInformationSessionExecute(mediaInformationSession.getSessionId(), FFmpegKitFactory.optionalNumericParameter(waitTimeout));
  }

  static enableLogCallback(logCallback) {
    FFmpegKitFactory.setGlobalLogCallback(logCallback);
  }

  static enableStatisticsCallback(statisticsCallback) {
    FFmpegKitFactory.setGlobalStatisticsCallback(statisticsCallback);
  }

  static enableExecuteCallback(executeCallback) {
    FFmpegKitFactory.setGlobalExecuteCallback(executeCallback);
  }

  static getLogLevel() {
    return FFmpegKitFactory.getLogLevel();
  }

  static setLogLevel(logLevel) {
    FFmpegKitFactory.setLogLevel(logLevel);
    return FFmpegKitReactNativeModule.setLogLevel(logLevel);
  }

  static getSessionHistorySize() {
    return FFmpegKitReactNativeModule.getSessionHistorySize();
  }

  static setSessionHistorySize(sessionHistorySize) {
    return FFmpegKitReactNativeModule.setSessionHistorySize(sessionHistorySize);
  }

  static async getSession(sessionId) {
    if (sessionId === undefined) {
      return undefined;
    } else {
      const sessionMap = await FFmpegKitReactNativeModule.getSession(sessionId);
      return FFmpegKitFactory.mapToSession(sessionMap);
    }
  }

  static async getLastSession() {
    const sessionMap = await FFmpegKitReactNativeModule.getLastSession();
    return FFmpegKitFactory.mapToSession(sessionMap);
  }

  static async getLastCompletedSession() {
    const sessionMap = await FFmpegKitReactNativeModule.getLastCompletedSession();
    return FFmpegKitFactory.mapToSession(sessionMap);
  }

  static async getSessions() {
    const sessionArray = await FFmpegKitReactNativeModule.getSessions();
    return sessionArray.map(FFmpegKitFactory.mapToSession);
  }

  static async getSessionsByState(sessionState) {
    const sessionArray = await FFmpegKitReactNativeModule.getSessionsByState(sessionState);
    return sessionArray.map(FFmpegKitFactory.mapToSession);
  }

  static getLogRedirectionStrategy() {
    return this.#globalLogRedirectionStrategy;
  }

  static setLogRedirectionStrategy(logRedirectionStrategy) {
    this.#globalLogRedirectionStrategy = logRedirectionStrategy;
  }

  static async messagesInTransmit(sessionId) {
    const sessionMap = await FFmpegKitReactNativeModule.messagesInTransmit(sessionId);
    return FFmpegKitFactory.mapToSession(sessionMap);
  }

  static sessionStateToString(state) {
    switch (state) {
      case SessionState.CREATED:
        return "CREATED";
      case SessionState.RUNNING:
        return "RUNNING";
      case SessionState.FAILED:
        return "FAILED";
      case SessionState.COMPLETED:
        return "COMPLETED";
      default:
        return "";
    }
  }

  // THE FOLLOWING TWO METHODS ARE REACT-NATIVE SPECIFIC

  static async enableLogs() {
    return FFmpegKitReactNativeModule.enableLogs();
  }

  static async disableLogs() {
    return FFmpegKitReactNativeModule.disableLogs();
  }

  static async enableStatistics() {
    return FFmpegKitReactNativeModule.enableStatistics();
  }

  static async disableStatistics() {
    return FFmpegKitReactNativeModule.disableStatistics();
  }

  static async getPlatform() {
    return FFmpegKitReactNativeModule.getPlatform();
  }

  static async writeToPipe(inputPath, pipePath) {
    return FFmpegKitReactNativeModule.writeToPipe(inputPath, pipePath);
  }

  static async selectDocumentForRead(type, extraTypes) {
    return FFmpegKitReactNativeModule.selectDocument(false, undefined, type, extraTypes);
  }

  static async selectDocumentForWrite(title, type, extraTypes) {
    return FFmpegKitReactNativeModule.selectDocument(true, title, type, extraTypes);
  }

  static async getSafParameterForRead(uriString) {
    return FFmpegKitReactNativeModule.getSafParameter(false, uriString);
  }

  static async getSafParameterForWrite(uriString) {
    return FFmpegKitReactNativeModule.getSafParameter(true, uriString);
  }

}
