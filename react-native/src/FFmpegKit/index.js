import {NativeModules} from 'react-native';
import {FFmpegSession} from "../FFmpegSession";
import {FFmpegKitConfig} from "../FFmpegKitConfig";
import {FFmpegKitFactory} from "../FFmpegKitFactory";

const {FFmpegKitReactNativeModule} = NativeModules;

export class FFmpegKit {

  static async executeAsync(command, executeCallback, logCallback, statisticsCallback) {
    return FFmpegKit.executeWithArgumentsAsync(this.parseArguments(command), executeCallback, logCallback, statisticsCallback);
  }

  static async executeWithArgumentsAsync(commandArguments, executeCallback, logCallback, statisticsCallback) {
    let session = await FFmpegSession.create(commandArguments, executeCallback, logCallback, statisticsCallback);

    await FFmpegKitConfig.asyncFFmpegExecute(session);

    return session;
  }

  static cancel(sessionId) {
    if (sessionId === undefined) {
      return FFmpegKitReactNativeModule.cancel();
    } else {
      return FFmpegKitReactNativeModule.cancelSession(sessionId);
    }
  }

  static async listSessions() {
    const sessionArray = await FFmpegKitReactNativeModule.getFFmpegSessions();
    return sessionArray.map(FFmpegKitFactory.mapToSession);
  }

  static parseArguments(command) {
    let argumentList = [];
    let currentArgument = "";

    let singleQuoteStarted = 0;
    let doubleQuoteStarted = 0;

    for (let i = 0; i < command.length; i++) {
      let previousChar;
      if (i > 0) {
        previousChar = command.charAt(i - 1);
      } else {
        previousChar = null;
      }
      let currentChar = command.charAt(i);

      if (currentChar === ' ') {
        if (singleQuoteStarted === 1 || doubleQuoteStarted === 1) {
          currentArgument += currentChar;
        } else if (currentArgument.length > 0) {
          argumentList.push(currentArgument);
          currentArgument = "";
        }
      } else if (currentChar === '\'' && (previousChar == null || previousChar !== '\\')) {
        if (singleQuoteStarted === 1) {
          singleQuoteStarted = 0;
        } else if (doubleQuoteStarted === 1) {
          currentArgument += currentChar;
        } else {
          singleQuoteStarted = 1;
        }
      } else if (currentChar === '\"' && (previousChar == null || previousChar !== '\\')) {
        if (doubleQuoteStarted === 1) {
          doubleQuoteStarted = 0;
        } else if (singleQuoteStarted === 1) {
          currentArgument += currentChar;
        } else {
          doubleQuoteStarted = 1;
        }
      } else {
        currentArgument += currentChar;
      }
    }

    if (currentArgument.length > 0) {
      argumentList.push(currentArgument);
    }

    return argumentList;
  }

  static argumentsToString(commandArguments) {
    if (arguments === undefined) {
      return 'undefined';
    }

    let command = '';

    function appendArgument(value, index) {
      if (index > 0) {
        command += ' ';
      }
      command += value;
    }

    commandArguments.forEach(appendArgument);
    return command;
  }

}
