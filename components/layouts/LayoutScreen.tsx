import { SafeAreaView } from 'react-native-safe-area-context';
import { Layout, LayoutProps } from '@ui-kitten/components';
import { ReactNode } from 'react';

interface LayoutScreenProps extends Omit<LayoutProps, 'style'> {
  children: ReactNode;
}
export const LayoutScreen = (props: LayoutScreenProps) => {
  const { children, ...layoutProps } = props;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout {...layoutProps} style={{ flex: 1, padding: 20 }}>
        {props.children}
      </Layout>
    </SafeAreaView>
  );
};
