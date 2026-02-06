import { Text } from '@ui-kitten/components';
import { useEffect, useState } from 'react';
import { saveStorageSecure } from '../../services/StorageService';
import Toast from 'react-native-toast-message';
import { Input } from '../Input';
import { View } from 'react-native';

export const ApiConnect = () => {
  const [local, setLocal] = useState<string>('');

  useEffect(() => {
    saveStorageSecure('local-ip', local).catch((error) => {
      Toast.show({
        type: 'error',
        text1: 'Error al guardar la IP',
        text2: 'Por favor, intenta nuevamente.',
      });
    });
  }, [local]);

  return (
    <View style={{ flexDirection: 'column', gap: 10 }}>
      <Input
        label="IP local"
        placeholder="Ingresa la IP - Ej: xxx.xxx.x.x"
        keyboardType="numeric"
        onChangeText={setLocal}
        value={local}
      />
      <Text status="warning">
        - Está ip ayudara a conectar un servicio local con el app
      </Text>
    </View>
  );
};
