import { ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

export default function TabTwoScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* HEADER */}
        <View style={styles.header}>
          <IconSymbol name="theatermasks" size={42} color="#A47551" />
          <ThemedText type="title" style={styles.title}>
            LANTARI
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Laku Ngesti Tari
          </ThemedText>
          <ThemedText style={styles.tagline}>
            Aplikasi Pemetaan Sanggar Tari
          </ThemedText>
        </View>

        {/* DESKRIPSI UTAMA */}
        <View style={styles.descriptionBox}>
          <ThemedText style={styles.descriptionText}>
            LANTARI – Laku Ngesti Tari merupakan aplikasi pemetaan sanggar budaya berbasis digital
            yang dirancang untuk mendata, mengelola, dan menampilkan lokasi sanggar tari secara
            interaktif. Aplikasi ini mendukung pelestarian budaya melalui dokumentasi lokasi
            sanggar yang terintegrasi dengan peta digital agar mudah diakses oleh masyarakat luas.
          </ThemedText>
        </View>

        {/* CARD 1 — DESKRIPSI */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <IconSymbol name="info.circle.fill" size={22} color="#A47551" />
            <ThemedText style={styles.cardTitle}>Deskripsi Aplikasi</ThemedText>
          </View>
          <ThemedText style={styles.cardText}>
            LANTARI membantu pengguna menemukan informasi sanggar tari secara cepat, akurat,
            dan terbarui. Aplikasi ini juga mendukung pengelolaan data lokasi sanggar sehingga
            dapat dijadikan media promosi dan pelestarian seni tari daerah.
          </ThemedText>
        </View>

        {/* CARD 2 — LOKASI */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <IconSymbol name="mappin.and.ellipse" size={22} color="#A47551" />
            <ThemedText style={styles.cardTitle}>Fitur Lokasi</ThemedText>
          </View>
          <ThemedText style={styles.cardText}>
            Fitur lokasi dapat menambahkan, mengubah, dan menghapus data
            sanggar tari secara langsung. Setiap data disimpan dalam sistem berbasis koordinat
            agar lokasi dapat ditampilkan secara presisi.
          </ThemedText>
        </View>

        {/* CARD 3 — PETA */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <IconSymbol name="map.fill" size={22} color="#A47551" />
            <ThemedText style={styles.cardTitle}>Fitur Peta</ThemedText>
          </View>
          <ThemedText style={styles.cardText}>
            Fitur peta menampilkan persebaran sanggar tari dalam bentuk titik lokasi
            sehingga dapat melihat area sebaran budaya dan menemukan lokasi terdekat
            dengan lebih mudah dan sistematis.
          </ThemedText>
        </View>

      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F3EC',
  },

  scroll: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    alignItems: 'center',
    marginBottom: 22,
  },

  title: {
    fontFamily: Fonts.rounded,
    fontSize: 34,
    color: '#5C3B22',
    marginTop: 6,
  },

  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#A47551',
    marginTop: 4,
  },

  tagline: {
    marginTop: 4,
    fontSize: 13,
    color: '#7A5A43',
    opacity: 0.9,
  },

  descriptionBox: {
    backgroundColor: '#FFF3E8',
    padding: 18,
    borderRadius: 14,
    borderLeftWidth: 4,
    borderLeftColor: '#C49A6C',
    marginBottom: 18,
  },

  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#4A3F35',
  },

  card: {
    backgroundColor: '#FFF8F1',
    padding: 18,
    marginTop: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E3D2C2',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#5C3B22',
  },

  cardText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#4A3F35',
  },
});
