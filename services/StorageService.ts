import * as SecureStore from 'expo-secure-store';

type StorageKeys = 'accessToken' | 'user';

export async function saveStorageSecure(key: StorageKeys, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function getStorageSecure(key: StorageKeys) {
  return await SecureStore.getItemAsync(key);
}
