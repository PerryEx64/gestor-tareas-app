import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useUserData } from '../../../hooks/useUser';
import { LayoutScreen } from '../../../components/layouts/LayoutScreen';
import { Card, Layout, Text } from '@ui-kitten/components';
import { ButtonLogout } from '../../../components/ButtonLogout';
import { ToggleTheme } from '../../../components/ToggleTheme';
import { ApiConnect } from '../../../components/forms/ApiConnect';

export const ProfileScreen = () => {
  const userData = useUserData();

  return (
    <Layout style={{ flex: 1, paddingVertical: 20 }} level="1">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.container}>
            <View style={styles.headerSection}>
              <View style={styles.avatarContainer}>
                <Text style={styles.avatarText}>
                  {userData?.firstname?.[0]?.toUpperCase() || 'U'}
                  {userData?.lastname?.[0]?.toUpperCase() || 'S'}
                </Text>
              </View>
              <Text style={styles.userName}>
                {userData?.firstname} {userData?.lastname}
              </Text>
              <Text style={styles.userEmail}>{userData?.email}</Text>
            </View>

            <Card style={styles.card} disabled>
              <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>Información Personal</Text>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Nombre</Text>
                  <Text style={styles.infoValue}>
                    {userData?.firstname || 'N/A'}
                  </Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Apellido</Text>
                  <Text style={styles.infoValue}>
                    {userData?.lastname || 'N/A'}
                  </Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Correo electrónico</Text>
                  <Text style={styles.infoValue}>
                    {userData?.email || 'N/A'}
                  </Text>
                </View>
              </View>
            </Card>

            <Card style={styles.card} disabled>
              <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>Preferencias</Text>
                <View style={styles.infoRow}>
                  <ToggleTheme />
                </View>
              </View>
            </Card>

            <Card style={styles.card} disabled>
              <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>Conectividad</Text>
                <View style={styles.infoRow}>
                  <ApiConnect />
                </View>
              </View>
            </Card>

            <ButtonLogout />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(51, 102, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#3366FF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#3366FF',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 6,
    textAlign: 'center',
  },
  userEmail: {
    fontSize: 14,
    opacity: 0.6,
    textAlign: 'center',
  },
  card: {
    borderRadius: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  infoSection: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  infoLabel: {
    fontSize: 14,
    opacity: 0.6,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    maxWidth: '60%',
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
});
