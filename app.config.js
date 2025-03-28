require('dotenv').config()

export default {
  expo: {
    name: 'movies',
    slug: 'movies',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      package: 'com.movies',
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './assets/images/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      API_URL: process.env.API_URL,
      API_KEY: process.env.API_KEY,
      IMAGE_URL: process.env.IMAGE_URL,
      eas: {
        projectId: "f4ba2c05-e264-440b-aa58-8d5244a4251b"
      }
    },
  },
};