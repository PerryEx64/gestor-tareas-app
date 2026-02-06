import { Text } from '@ui-kitten/components';
import { useEffect, useState } from 'react';
import {
  getStorageSecure,
  saveStorageSecure,
} from '../../services/StorageService';
import Toast from 'react-native-toast-message';
import { Input } from '../Input';
import { View } from 'react-native';
import { BottomSheetInput } from '../BottomSheetInput';

interface ApiConnectProps {
  inInBottomSheet?: boolean;
}
export const ApiConnect = (props: ApiConnectProps) => {
  const { inInBottomSheet } = props;
  const [local, setLocal] = useState<string>('');

  useEffect(() => {
    getStorageSecure('local-ip')
      .then((ip) => {
        if (ip) {
          setLocal(ip);
        }
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Error al cargar la IP',
          text2: 'Por favor, ingresala nuevamente.',
        });
      });
  }, []);

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
      {!inInBottomSheet ? (
        <Input
          label="IP local"
          placeholder="Ingresa la IP - Ej: xxx.xxx.x.x"
          keyboardType="numeric"
          onChangeText={setLocal}
          value={local}
        />
      ) : (
        <BottomSheetInput
          label="IP local"
          placeholder="Ingresa la IP - Ej: xxx.xxx.x.x"
          keyboardType="numeric"
          onChangeText={setLocal}
          value={local}
        />
      )}
      <Text status="warning">
        - Está ip ayudara a conectar un servicio local con el app
      </Text>
    </View>
  );
};
