import { SafeAreaView } from 'react-native-safe-area-context';
import { Layout, LayoutProps } from '@ui-kitten/components';
import { ReactNode } from 'react';

interface LayoutScreenProps extends LayoutProps {
  children: ReactNode;
}
export const LayoutScreen = (props: LayoutScreenProps) => {
  const { children, ...layoutProps } = props;
  return (
    <Layout
      {...layoutProps}
      style={{
        flex: 1,
        paddingVertical: 20,
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>{props.children}</SafeAreaView>
    </Layout>
  );
};
