# reactnativesdktest #

*As validated on __macOS Sierra 10.12.5__*

## Setup development environment ##

1. Install Xcode from the Mac App Store
2. Install brew: `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
3. Install dependencies:

        brew install node
        brew install watchman
        brew install wget
        npm install -g react-native-cli
        sudo gem install cocoapods

4. Set Git preferences:

        git config --global user.email "your_email@example.com"
        git config --global user.name "Your Name"

5. Clone repository:

        cd ~
        git clone https://github.com/agolden/reactnativesdktest.git

## Run app ##


1. Install dependencies:

        cd ~/reactnativesdktest
        npm install
        cd ~/reactnativesdktest/mobile_sdk
        wget https://github.com/forcedotcom/SalesforceMobileSDK-iOS/archive/master.zip
        unzip master.zip
        mv SalesforceMobileSDK-iOS-master/* salesforcemobilesdk-ios/
        cd ~/reactnativesdktest/ios
        pod install

2. Run react native server:

        cd ~/reactnativesdktest
        npm start

3. Open workspace in Xcode (using separate terminal window):

        cd ~/reactnativesdktest/ios
        open sdktest.xcworkspace

4. Run application from Xcode (Suggest viewing on iPhone 7)

## View React Native Logs ##

1. From the iOS simulator, hit command+D
2. Select 'Debug Remote JS' (should open new tab/window in Chrome)
3. Open Developer Tools (command+option+J)
4. Select 'Console' tab; react native logging now appears in console below.

## Reproduce Issue ##

1. Launch application (login screen appears)
2. Select 'Use Custom Domain'
3. Enter totally fake custom domain, e.g., 'ABCDEFG' (error message appears: "SERVER ERROR'; "Can't connect to the server....")
4. Select 'Dismiss' (user is now stranded on a blue screen with no way to get back; no error messages appear in react native logs)

## Expected Behavior ##

1. Launch application (login screen appears)
2. Select 'Use Custom Domain'
3. Enter totally fake custom domain, e.g., 'ABCDEFG' (error message appears: "SERVER ERROR'; "Can't connect to the server....")
4. Select 'Dismiss'; As shown in 'app.js' on line 55, the failure callback is invoked and 'Failed to authenticate' is written to the react native logs; User returned to the react-native app (i.e., the webview showing Salesforce is closed)
