import {NativeEventEmitter, NativeModules} from 'react-native';
import {FFmpegKitFactory} from "../FFmpegKitFactory";
import {LogRedirectionStrategy} from "../LogRedirectionStrategy";
import {Level} from "../Level";
import {ArchDetect} from "../ArchDetect";
import {Packages} from "../Packages";
import {FFmpegKitConfig} from "../FFmpegKitConfig";

const {FFmpegKitReactNativeModule} = NativeModules;

const eventLogCallbackEvent = "FFmpegKitLogCallbackEvent";
const eventStatisticsCallbackEvent = "FFmpegKitStatisticsCallbackEvent";
const eventExecuteCallbackEvent = "FFmpegKitExecuteCallbackEvent";

export function FFmpegKitInitializer() {
  const eventEmitter = new NativeEventEmitter(FFmpegKitReactNativeModule);
  eventEmitter.addListener(eventLogCallbackEvent, processLogCallbackEvent);
  eventEmitter.addListener(eventStatisticsCallbackEvent, processStatisticsCallbackEvent);
  eventEmitter.addListener(eventExecuteCallbackEvent, processExecuteCallbackEvent);

  function processLogCallbackEvent(event) {
    const log = FFmpegKitFactory.mapToLog(event)
    const sessionId = event.sessionId;
    const level = event.level;
    const text = event.message;
    const activeLogLevel = FFmpegKitConfig.getLogLevel();
    let globalCallbackDefined = false;
    let sessionCallbackDefined = false;
    let activeLogRedirectionStrategy = FFmpegKitConfig.getLogRedirectionStrategy();

    // AV_LOG_STDERR logs are always redirected
    if ((activeLogLevel === Level.AV_LOG_QUIET && level !== Level.AV_LOG_STDERR) || level > activeLogLevel) {
      // LOG NEITHER PRINTED NOR FORWARDED
      return;
    }

    FFmpegKitConfig.getSession(sessionId).then(session => {
      activeLogRedirectionStrategy = session.getLogRedirectionStrategy();

      if (session.getLogCallback() !== undefined) {
        sessionCallbackDefined = true;

        try {
          // NOTIFY SESSION CALLBACK DEFINED
          session.getLogCallback()(log);
        } catch (err) {
          console.log("Exception thrown inside session LogCallback block.", err.stack);
        }
      }

      let globalLogCallbackFunction = FFmpegKitFactory.getGlobalLogCallback();
      if (globalLogCallbackFunction !== undefined) {
        globalCallbackDefined = true;

        try {
          // NOTIFY GLOBAL CALLBACK DEFINED
          globalLogCallbackFunction(log);
        } catch (err) {
          console.log("Exception thrown inside global LogCallback block.", err.stack);
        }
      }

      // EXECUTE THE LOG STRATEGY
      switch (activeLogRedirectionStrategy) {
        case LogRedirectionStrategy.NEVER_PRINT_LOGS: {
          return;
        }
        case LogRedirectionStrategy.PRINT_LOGS_WHEN_GLOBAL_CALLBACK_NOT_DEFINED: {
          if (globalCallbackDefined) {
            return;
          }
        }
          break;
        case LogRedirectionStrategy.PRINT_LOGS_WHEN_SESSION_CALLBACK_NOT_DEFINED: {
          if (sessionCallbackDefined) {
            return;
          }
        }
          break;
        case LogRedirectionStrategy.PRINT_LOGS_WHEN_NO_CALLBACKS_DEFINED: {
          if (globalCallbackDefined || sessionCallbackDefined) {
            return;
          }
        }
          break;
        case LogRedirectionStrategy.ALWAYS_PRINT_LOGS: {
        }
          break;
      }

      // PRINT LOGS
      switch (level) {
        case Level.AV_LOG_QUIET: {
          // PRINT NO OUTPUT
        }
          break;
        default: {
          console.log(text);
        }
      }
    });
  }

  function processStatisticsCallbackEvent(event) {
    let statistics = FFmpegKitFactory.mapToStatistics(event);
    let sessionId = event.sessionId;

    FFmpegKitConfig.getSession(sessionId).then(session => {
      if (session.isFFmpeg()) {
        if (session.getStatisticsCallback() !== undefined) {
          try {
            // NOTIFY SESSION CALLBACK DEFINED
            session.getStatisticsCallback()(statistics);
          } catch (err) {
            console.log("Exception thrown inside session StatisticsCallback block.", err.stack);
          }
        }
      }

      let globalStatisticsCallbackFunction = FFmpegKitFactory.getGlobalStatisticsCallback();
      if (globalStatisticsCallbackFunction !== undefined) {
        try {
          // NOTIFY GLOBAL CALLBACK DEFINED
          globalStatisticsCallbackFunction(statistics);
        } catch (err) {
          console.log("Exception thrown inside global StatisticsCallback block.", err.stack);
        }
      }
    });
  }

  function processExecuteCallbackEvent(event) {
    let sessionId = event.sessionId;

    FFmpegKitConfig.getSession(sessionId).then(session => {
      if (session.getExecuteCallback() !== undefined) {
        try {
          // NOTIFY SESSION CALLBACK DEFINED
          session.getExecuteCallback()(session);
        } catch (err) {
          console.log("Exception thrown inside session ExecuteCallback block.", err.stack);
        }
      }

      let globalExecuteCallbackFunction = FFmpegKitFactory.getGlobalExecuteCallback();
      if (globalExecuteCallbackFunction !== undefined) {
        try {
          // NOTIFY GLOBAL CALLBACK DEFINED
          globalExecuteCallbackFunction(session);
        } catch (err) {
          console.log("Exception thrown inside global ExecuteCallback block.", err.stack);
        }
      }
    });
  }

  async function initialize() {
    const version = FFmpegKitFactory.getVersion();
    const platform = await FFmpegKitConfig.getPlatform();
    const arch = await ArchDetect.getArch();
    const packageName = await Packages.getPackageName();
    FFmpegKitFactory.setLogLevel(await FFmpegKitReactNativeModule.getLogLevel());
    await FFmpegKitConfig.enableRedirection();

    return `${platform}-${packageName}-${arch}-${version}`;
  }

  console.log("Loading ffmpeg-kit-react-native.");
  initialize().then(fullPlatformName => {
    console.log(`Loaded ffmpeg-kit-react-native-${fullPlatformName}.`);
  });
}
