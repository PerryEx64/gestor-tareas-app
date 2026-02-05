import axios from 'axios';
import { getItemAsync } from 'expo-secure-store';

export const getAutenticate = async () => {
  const accessToken = await getItemAsync('accessToken');

  if (!accessToken) {
    throw new Error('No refresh token found');
  }

  return axios.create({
    baseURL: process.env.EXPO_PUBLIC_ENPOINT_LOCAL,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
