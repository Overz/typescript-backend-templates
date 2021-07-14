import { ConfigContext, ExpoConfig } from '@expo/config';

export default (config: ConfigContext): ExpoConfig => ({
  name: 'app',
  slug: 'app',
  version: '1.0.0',
  privacy: 'public',
  platforms: ['android', 'ios'],
  sdkVersion: '42.0.0',
  backgroundColor: '#fff',
  description: 'This is an app to test react-navigation v5',
  icon: './assets/icon.png',
  splash: {
    image: './assets/app.png',
    resizeMode: 'contain',
    backgroundColor: '#fff',
  },
  android: {
    package: 'com.overz.appnavigation',
    adaptiveIcon: {
      foregroundImage: './assets/icon.png',
      backgroundColor: '#FFFFFF',
    },
  },
  ios: {
    supportsTablet: true,
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  userInterfaceStyle: 'automatic',
  githubUrl: 'https://github.com/Overz/templates/tree/master/app-bare-workflow',
});
