import {NativeModules} from 'react-native';

const {FFmpegKitReactNativeModule} = NativeModules;

export class Packages {

  static getPackageName() {
    return FFmpegKitReactNativeModule.getPackageName();
  }

  static getExternalLibraries() {
    return FFmpegKitReactNativeModule.getExternalLibraries();
  }

}
