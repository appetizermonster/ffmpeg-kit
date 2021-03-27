import {NativeModules} from 'react-native';

const {FFmpegKitReactNativeModule} = NativeModules;

export class ArchDetect {

  static async getArch() {
    return FFmpegKitReactNativeModule.getArch();
  }

}
