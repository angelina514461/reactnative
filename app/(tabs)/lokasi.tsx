import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useRouter } from 'expo-router';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, remove } from 'firebase/database';
import React, { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Linking,
    RefreshControl,
    SectionList,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

export default function LokasiScreen() {
    const router = useRouter();

    // Firebase Configuration
    const firebaseConfig = {
        apiKey: "AIzaSyCtYUZBKoV9ImcpVZpVsnNB0oxpKtkKeo4",
        authDomain: "reactnative-2015-baru.firebaseapp.com",
        databaseURL: "https://reactnative-2015-baru-default-rtdb.firebaseio.com",
        projectId: "reactnative-2015-baru",
        storageBucket: "reactnative-2015-baru.firebasestorage.app",
        messagingSenderId: "1087104767464",
        appId: "1:1087104767464:web:9e11cb27de0017a860c05d"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Buka Google Maps
    const handlePress = (coordinates: string) => {
        const [latitude, longitude] = coordinates.split(',').map(coord => coord.trim());
        const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
        Linking.openURL(url);
    };

    // Hapus lokasi
    const handleDelete = (id) => {
        Alert.alert("Hapus Lokasi", "Apakah yakin ingin menghapus lokasi ini?", [
            { text: "Batal", style: "cancel" },
            {
                text: "Hapus",
                onPress: () => remove(ref(db, `points/${id}`)),
                style: "destructive"
            }
        ]);
    };

    // Edit lokasi
    const handleEdit = (item: any) => {
        router.push({
            pathname: "/formeditlocation",
            params: {
                id: item.id,
                name: item.name,
                coordinates: item.coordinates,
                accuration: item.accuration || ''
            }
        });
    };

    // Ambil data dari Firebase
    useEffect(() => {
        const pointsRef = ref(db, 'points/');
        const unsubscribe = onValue(pointsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const pointsArray = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                setSections([{ title: 'Lokasi Sanggar Tari', data: pointsArray }]);
            } else {
                setSections([]);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    }, []);

    // Loading Screen
    if (loading) {
        return (
            <ThemedView style={styles.center}>
                <ActivityIndicator size="large" color="#951B1F" />
            </ThemedView>
        );
    }

    return (
        <View style={styles.container}>
            {sections.length > 0 ? (
                <SectionList
                    sections={sections}
                    keyExtractor={(item) => item.id}

                    renderSectionHeader={({ section: { title } }) => (
                        <View style={styles.headerWrapper}>
                            <ThemedText style={styles.header}>🏵 {title} 🏵</ThemedText>
                        </View>
                    )}

                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.item} onPress={() => handlePress(item.coordinates)}>
                            <View style={{ flex: 1 }}>
                                <ThemedText style={styles.itemName}>{item.name}</ThemedText>
                                <ThemedText style={styles.itemCoords}>{item.coordinates}</ThemedText>
                            </View>

                            <View style={styles.buttonGroup}>
                                <TouchableOpacity onPress={() => handleEdit(item)} style={styles.editButton}>
                                    <FontAwesome5 name="pencil-alt" size={18} color="#951B1F" />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                                    <FontAwesome5 name="trash" size={18} color="white" />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    )}

                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor="#951B1F"
                        />
                    }
                />
            ) : (
                <ThemedView style={styles.center}>
                    <ThemedText>Tidak ada lokasi sanggar tersimpan.</ThemedText>
                </ThemedView>
            )}
        </View>
    );
}


/* =============================
    STYLING UI BUDAYA PREMIUM
============================= */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4EFE7', // krem klasik budaya
        padding: 16,
    },

    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    headerWrapper: {
        alignItems: 'center',
        marginBottom: 20,
    },

    header: {
        fontSize: 26,
        fontWeight: '800',
        backgroundColor: '#951B1F', // merah batik
        color: '#F6D365', // emas budaya
        paddingVertical: 18,
        paddingHorizontal: 30,
        borderRadius: 30,
        elevation: 8,
        letterSpacing: 1.5,
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowRadius: 7,
    },

    item: {
        backgroundColor: '#203A63', // biru tua budaya
        borderRadius: 22,
        padding: 18,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 6,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },

    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFD700',
        marginBottom: 6,
    },

    itemCoords: {
        fontSize: 13,
        color: '#E5EAF0',
        fontStyle: 'italic',
    },

    buttonGroup: {
        gap: 12,
        alignItems: 'center',
    },

    editButton: {
        backgroundColor: '#F6D365',
        padding: 10,
        borderRadius: 12,
        elevation: 4,
    },

    deleteButton: {
        backgroundColor: '#B00020',
        padding: 10,
        borderRadius: 12,
        elevation: 4,
    },
});
