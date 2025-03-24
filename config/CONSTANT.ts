import Constants from 'expo-constants';
const { IMAGE_URL } = Constants.expoConfig?.extra || {};
export const IMAGE_URI_SMALL_SIZE = `${IMAGE_URL}w200`;
export const IMAGE_URI_BIG_SIZE = `${IMAGE_URL}w500`;
export const API_URI = '';

export const HORIZONTAL_STACK_CONFIG_BIG = {
  height: 240,
  width: 180,
  loop: false
};
export const HORIZONTAL_STACK_CONFIG_SMALL = {
  height: 200,
  width: 140,
  loop: true,
};
