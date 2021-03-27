import {Statistics} from "../Statistics";
import {Log} from "../Log";
import {Session} from "../Session";
import {LogRedirectionStrategy} from "../LogRedirectionStrategy";
import {StatisticsCallback} from "../StatisticsCallback";
import {LogCallback} from "../LogCallback";
import {ExecuteCallback} from "../ExecuteCallback";
import {Level} from "ffmpeg-kit-react-native";

export class FFmpegKitFactory {

  static mapToStatistics(statisticsMap: { [key: string]: any }): Statistics;

  static mapToLog(logMap: { [key: string]: any }): Log;

  static mapToSession(sessionMap: { [key: string]: any }): Session;

  static getVersion(): string;

  static getLogRedirectionStrategy(sessionId: number): LogRedirectionStrategy;

  static setLogRedirectionStrategy(sessionId: number, logRedirectionStrategy: LogRedirectionStrategy): void;

  static getLogCallback(sessionId: number): LogCallback;

  static setLogCallback(sessionId: number, logCallback: LogCallback): void;

  static getGlobalLogCallback(): LogCallback;

  static setGlobalLogCallback(logCallback: LogCallback): void;

  static getStatisticsCallback(sessionId: number): StatisticsCallback;

  static setStatisticsCallback(sessionId: number, statisticsCallback: StatisticsCallback): void;

  static getGlobalStatisticsCallback(): StatisticsCallback;

  static setGlobalStatisticsCallback(statisticsCallback: StatisticsCallback): void;

  static getExecuteCallback(sessionId: number): ExecuteCallback;

  static setExecuteCallback(sessionId: number, executeCallback: ExecuteCallback): void;

  static getGlobalExecuteCallback(): ExecuteCallback;

  static setGlobalExecuteCallback(executeCallback: ExecuteCallback): void;

  static setLogLevel(level: Level);

  static getLogLevel(): Level;

  static optionalNumericParameter(value: number): number;

  static validDate(time: number): Date;

}
