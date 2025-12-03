import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';


// ======================
// FIREBASE CONFIG
// ======================
const firebaseConfig = {
    apiKey: "AIzaSyCtYUZBKoV9ImcpVZpVsnNB0oxpKtkKeo4",
    authDomain: "reactnative-2015-baru.firebaseapp.com",
    databaseURL: "https://reactnative-2015-baru-default-rtdb.firebaseio.com",
    projectId: "reactnative-2015-baru",
    storageBucket: "reactnative-2015-baru.firebasestorage.app",
    messagingSenderId: "1087104767464",
    appId: "1:1087104767464:web:9e11cb27de0017a860c05d"
};


// ======================
// INIT
// ======================
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


export default function MapScreen() {
    const [markers, setMarkers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);


    // ======================
    // FETCH DATA
    // ======================
    useEffect(() => {
        const pointsRef = ref(db, 'points/');

        const unsubscribe = onValue(pointsRef, (snapshot) => {
            const data = snapshot.val();

            if (data) {
                const parsedMarkers = Object.keys(data).map(key => {
                    const point = data[key];

                    if (!point.coordinates || typeof point.coordinates !== 'string') {
                        return null;
                    }

                    const [latitude, longitude] = point.coordinates.split(',').map(Number);

                    if (isNaN(latitude) || isNaN(longitude)) return null;

                    return {
                        id: key,
                        name: point.name,
                        latitude,
                        longitude,
                    };
                }).filter(Boolean);

                setMarkers(parsedMarkers);
            } else {
                setMarkers([]);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);


    // ======================
    // LOADING
    // ======================
    if (loading) {
        return (
            <View style={styles.loading}>
                <Ionicons name="flower-outline" size={42} color="#8E1616" />
                <ActivityIndicator size="large" color="#8E1616" />
                <Text style={styles.loadingText}>Memuat Peta Budaya...</Text>
            </View>
        );
    }


    // ======================
    // UI MAP
    // ======================
    return (
        <View style={styles.container}>

            {/* HEADER */}
            <View style={styles.header}>
                <Ionicons name="map-outline" size={20} color="#FFD700" />
                <Text style={styles.headerTitle}>PETA SANGGAR TARI</Text>
            </View>


            {/* MAP */}
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: -7.7956,
                    longitude: 110.3695,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.01,
                }}
                zoomControlEnabled={true}
            >
                {markers.map(marker => (
                    <Marker
                        key={marker.id}
                        coordinate={{
                            latitude: marker.latitude,
                            longitude: marker.longitude,
                        }}
                        title={marker.name}
                        description={`${marker.latitude}, ${marker.longitude}`}
                        pinColor="#8E1616"
                    />
                ))}
            </MapView>


            {/* FLOATING BUTTON TAMBAH */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => router.push('/forminputlocation')}
            >
                <View style={styles.fabInner}>
                    <FontAwesome name="plus" size={18} color="#8E1616" />
                </View>
            </TouchableOpacity>

        </View>
    );
}


// ======================
// STYLING BUDAYA
// ======================
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F8F4EC',
    },

    header: {
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 10,
        backgroundColor: '#8E1616',
        paddingVertical: 12,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 6,
        elevation: 5,
    },

    headerTitle: {
        color: '#FFD700',
        fontWeight: '800',
        fontSize: 14,
        letterSpacing: 1,
    },

    map: {
        flex: 1,
    },

    fab: {
    position: 'absolute',
    left: 18,     // PINDAH KE KIRI
    bottom: 18,
    backgroundColor: '#FFD700',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
},


    fabInner: {
        backgroundColor: '#FFF7D6',
        width: 46,
        height: 46,
        borderRadius: 23,
        justifyContent: 'center',
        alignItems: 'center'
    },

    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F4EC',
    },

    loadingText: {
        marginTop: 8,
        color: '#8E1616',
        fontWeight: '600'
    },

});
