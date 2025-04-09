#!/bin/sh
echo "🔧 Running pod install..."
cd ios
pod install
chmod +x ci_scripts/ci_pre_xcodebuild.sh

