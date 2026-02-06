import * as SecureStore from 'expo-secure-store';

type StorageKeys = 'accessToken' | 'user' | 'theme' | 'local-ip';

export async function saveStorageSecure(key: StorageKeys, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function getStorageSecure(key: StorageKeys) {
  return await SecureStore.getItemAsync(key);
}

export async function deleteStorageSecure(key: StorageKeys) {
  await SecureStore.deleteItemAsync(key);
}
