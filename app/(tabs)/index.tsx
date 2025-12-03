import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>

        <Image
          source={require('@/assets/images/Lantari_Logo.png')}
          style={styles.logo}
        />

        <ThemedText type="title" style={styles.title}>
          SELAMAT DATANG DI LANTARI
        </ThemedText>

        <ThemedText style={styles.subtitle}>
          Jelajahi Dunia Tari di Dekatmu
        </ThemedText>

      </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 60,
    backgroundColor: '#F8F1E7', // nuansa krem budaya
  },

  headerLogo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    opacity: 0.25,
    alignSelf: 'center',
  },

  logoWrapper: {
    backgroundColor: '#E3D2C2',
    padding: 20,
    borderRadius: 140,
    borderWidth: 3,
    borderColor: '#A47551',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },

  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    color: '#5C3B22', // warna coklat tradisional
    marginBottom: 8,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 16,
    color: '#7A5C47',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
