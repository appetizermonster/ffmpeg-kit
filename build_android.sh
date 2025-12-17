#!/bin/bash

export ANDROID_NDK_ROOT=$ANDROID_SDK_ROOT/ndk/25.2.9519653

./android.sh --lts --enable-lame --enable-libpng --enable-opus --enable-libvorbis --disable-arm-v7a
