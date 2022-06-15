import AsyncStorage from '@react-native-async-storage/async-storage';

type Key = 'AUTH_HEADER';

export const save = async (key: Key, value: string) => {
  await AsyncStorage.setItem(key, value);
};

export const load = async (key: Key) => {
  const value = await AsyncStorage.getItem(key);
  return value;
};
