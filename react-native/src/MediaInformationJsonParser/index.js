import {NativeModules} from 'react-native';
import {MediaInformation} from "../MediaInformation";

const {FFmpegKitReactNativeModule} = NativeModules;

export class MediaInformationJsonParser {

  static async from(ffprobeJsonOutput) {
    return FFmpegKitReactNativeModule.mediaInformationJsonParserFrom(ffprobeJsonOutput).map(properties => new MediaInformation(properties));
  }

  static async fromWithError(ffprobeJsonOutput) {
    return FFmpegKitReactNativeModule.mediaInformationJsonParserFrom(ffprobeJsonOutput).map(properties => new MediaInformation(properties));
  }

}
