import axios from 'axios';
import { getItemAsync } from 'expo-secure-store';
import { getStorageSecure } from './StorageService';

export const getAutenticate = async (notRequiredToken?: boolean) => {
  let url = process.env.EXPO_PUBLIC_ENPOINT_LOCAL;

  try {
    const ipExternal = await getStorageSecure('local-ip');
    if (ipExternal && ipExternal.trim() !== '') {
      url = `http://${ipExternal}:3000/api`;
    }
    console.log('Using local IP for baseURL:', url);
  } catch (e) {
    console.log('No local IP found, using default URL');
  }

  if (notRequiredToken) {
    return axios.create({
      baseURL: url,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const accessToken = await getItemAsync('accessToken');

  if (!accessToken) {
    throw new Error('No refresh token found');
  }

  return axios.create({
    baseURL: url,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
