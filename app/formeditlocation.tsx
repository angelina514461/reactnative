import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, update } from "firebase/database";
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';



/* ===============================
   HELPER KONVERSI PARAM
================================ */
const parseParam = (param: string | string[] | undefined) => {
    if (Array.isArray(param)) return param[0];
    return param ?? '';
};


export default function App() {
    const router = useRouter();
    const params = useLocalSearchParams();

    // Ambil parameter aman
    const id = parseParam(params.id);
    const [nama, setNama] = useState(parseParam(params.name));
    const [location, setLocation] = useState(parseParam(params.coordinates));
    const [akurat, setAkurat] = useState(parseParam(params.accuration));


    /* ===============================
       GET LOCATION
    ================================ */
    const getCoordinates = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Izin lokasi ditolak');
            return;
        }

        let loc = await Location.getCurrentPositionAsync({});
        const coords = loc.coords.latitude + ',' + loc.coords.longitude;
        setLocation(coords);

        const accuracyValue = loc.coords.accuracy ?? 0;
        setAkurat(accuracyValue.toFixed(1) + ' m');
    };


    /* ===============================
       FIREBASE
    ================================ */
    const firebaseConfig = {
        apiKey: "AIzaSyCtYUZBKoV9ImcpVZpVsnNB0oxpKtkKeo4",
        authDomain: "reactnative-2015-baru.firebaseapp.com",
        databaseURL: "https://reactnative-2015-baru-default-rtdb.firebaseio.com",
        projectId: "reactnative-2015-baru",
        storageBucket: "reactnative-2015-baru.firebasestorage.app",
        messagingSenderId: "1087104767464",
        appId: "1:1087104767464:web:9e11cb27de0017a860c05d"
    };

    const db = getDatabase(initializeApp(firebaseConfig));


    /* ===============================
       UPDATE HANDLER
    ================================ */
    const handleUpdate = () => {
        if (!nama || !location || !akurat) {
            Alert.alert("Validasi", "Semua kolom wajib diisi.");
            return;
        }

        if (!id) {
            Alert.alert("Error", "ID tidak ditemukan.");
            return;
        }

        const pointRef = ref(db, `points/${id}`);

        update(pointRef, {
            name: nama,
            coordinates: location,
            accuration: akurat
        }).then(() => {
            Alert.alert("Berhasil", "Data berhasil diperbarui", [
                { text: "OK", onPress: () => router.back() }
            ]);
        }).catch(() => {
            Alert.alert("Error", "Gagal mengupdate data");
        });
    };


    /* ===============================
       UI
    ================================ */
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safe}>

                <Stack.Screen options={{ title: 'Edit Sanggar Tari' }} />

                {/* HEADER */}
                <View style={styles.header}>
                    <Ionicons name="flower-outline" size={26} color="#FFD700" />
                    <Text style={styles.headerTitle}>LANTARI</Text>
                    <Text style={styles.headerSubtitle}>Perbarui Titik Budaya</Text>
                </View>


                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                >
                    <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>

                        <View style={styles.card}>

                            <Text style={styles.label}>Nama Sanggar</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Isikan nama sanggar tari"
                                value={nama}
                                onChangeText={setNama}
                            />

                            <Text style={styles.label}>Koordinat Lokasi</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="contoh: -7.797068, 110.370529"
                                value={location}
                                onChangeText={setLocation}
                            />

                            <Text style={styles.label}>Akurasi</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="contoh: 5 meter"
                                value={akurat}
                                onChangeText={setAkurat}
                            />


                            {/* BUTTON GPS */}
                            <TouchableOpacity style={styles.btnLocation} onPress={getCoordinates}>
                                <Ionicons name="location" size={18} color="#fff" />
                                <Text style={styles.btnText}> Ambil Lokasi Sekarang</Text>
                            </TouchableOpacity>


                            {/* BUTTON UPDATE */}
                            <TouchableOpacity style={styles.btnSave} onPress={handleUpdate}>
                                <Ionicons name="save" size={20} color="#FFD700" />
                                <Text style={styles.btnText}> PERBARUI DATA</Text>
                            </TouchableOpacity>

                        </View>

                    </ScrollView>
                </KeyboardAvoidingView>

            </SafeAreaView>
        </SafeAreaProvider>
    );
}


/* ===============================
   STYLING TEMA BUDAYA (SAMA)
================================ */

const styles = StyleSheet.create({

    safe: {
        flex: 1,
        backgroundColor: '#F8F4EC',
    },

    header: {
        backgroundColor: '#8E1616',
        paddingVertical: 18,
        alignItems: 'center',
        elevation: 5,
    },

    headerTitle: {
        color: '#FFD700',
        fontSize: 18,
        fontWeight: '800',
        marginTop: 4,
        letterSpacing: 1,
    },

    headerSubtitle: {
        color: '#FFE9A6',
        fontSize: 12,
    },

    card: {
        backgroundColor: '#ffffff',
        margin: 18,
        padding: 20,
        borderRadius: 18,
        elevation: 4,
    },

    label: {
        fontSize: 13,
        fontWeight: '700',
        color: '#8E1616',
        marginTop: 12,
    },

    input: {
        height: 44,
        marginTop: 6,
        borderColor: '#C58940',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 12,
        backgroundColor: '#FFF8E1',
    },

    btnLocation: {
        backgroundColor: '#2E5EAA',
        marginTop: 18,
        paddingVertical: 12,
        borderRadius: 14,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },

    btnSave: {
        backgroundColor: '#8E1616',
        marginTop: 14,
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },

    btnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    }

});
