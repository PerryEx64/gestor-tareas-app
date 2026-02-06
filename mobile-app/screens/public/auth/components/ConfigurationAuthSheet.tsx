import { StyleSheet, View } from 'react-native';
import { Button } from '../../../../components/Button';
import { BottomSheet } from '../../../../components/BottomSheet';
import { useState } from 'react';
import { Card, Layout } from '@ui-kitten/components';
import { ToggleTheme } from '../../../../components/ToggleTheme';
import { ApiConnect } from '../../../../components/forms/ApiConnect';

export const ConfigurationAuthSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View>
      <Button
        status="info"
        appearance="outline"
        onPress={() => setIsOpen(true)}
      >
        Configuración
      </Button>
      <BottomSheet isOpen={isOpen} onOpen={setIsOpen} snapPoints={['30%']}>
        <Layout
          level="1"
          style={{ flex: 1, padding: 20, gap: 20, paddingBottom: 50 }}
        >
          <ToggleTheme />
          <ApiConnect inInBottomSheet />
        </Layout>
      </BottomSheet>
    </View>
  );
};
