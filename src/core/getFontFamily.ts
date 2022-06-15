import { Platform } from 'react-native';

function getFontFamily() {
  return Platform.OS === 'ios' ? 'Trebuchet MS' : 'sans-serif-light';
}

export default getFontFamily;
