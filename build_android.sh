#!/bin/bash

export ANDROID_NDK_ROOT=$ANDROID_SDK_ROOT/ndk/28.1.13356709

./android.sh --lts --enable-lame --enable-opus --enable-libvorbis --disable-arm-v7a-neon
