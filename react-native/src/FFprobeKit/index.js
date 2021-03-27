import {NativeModules} from 'react-native';
import {FFmpegKit} from "../FFmpegKit";
import {FFmpegKitConfig} from "../FFmpegKitConfig";
import {FFprobeSession} from "../FFprobeSession";
import {MediaInformationSession} from "../MediaInformationSession";
import {FFmpegKitFactory} from "../FFmpegKitFactory";

const {FFmpegKitReactNativeModule} = NativeModules;

export class FFprobeKit {

  static async executeAsync(command, executeCallback, logCallback) {
    return FFprobeKit.executeWithArgumentsAsync(FFmpegKit.parseArguments(command), executeCallback, logCallback);
  }

  static async executeWithArgumentsAsync(commandArguments, executeCallback, logCallback) {
    let session = await FFprobeSession.create(commandArguments, executeCallback, logCallback);

    await FFmpegKitConfig.asyncFFprobeExecute(session);

    return session;
  }

  static async getMediaInformationAsync(path, executeCallback, logCallback, waitTimeout) {
    const commandArguments = ["-v", "error", "-hide_banner", "-print_format", "json", "-show_format", "-show_streams", "-i", path];
    return FFprobeKit.getMediaInformationFromCommandArgumentsAsync(commandArguments, executeCallback, logCallback, waitTimeout);
  }

  static async getMediaInformationFromCommandAsync(command, executeCallback, logCallback, waitTimeout) {
    return FFprobeKit.getMediaInformationFromCommandArgumentsAsync(FFmpegKit.parseArguments(command), executeCallback, logCallback, waitTimeout);
  }

  static async getMediaInformationFromCommandArgumentsAsync(commandArguments, executeCallback, logCallback, waitTimeout) {
    let session = await MediaInformationSession.create(commandArguments, executeCallback, logCallback);

    await FFmpegKitConfig.asyncGetMediaInformationExecute(session, waitTimeout);

    return session;
  }

  static async listSessions() {
    const sessionArray = await FFmpegKitReactNativeModule.getFFprobeSessions();
    return sessionArray.map(FFmpegKitFactory.mapToSession);
  }

}
