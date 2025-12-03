import { FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { router } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';

const webmap = require('../../assets/html/map.html');

export default function App() {
    return (
        <View style={styles.container}>
            <WebView
                style={styles.webview}
                source={webmap}
            />

            {/* Floating Action Button Budaya */}
            <TouchableOpacity style={styles.fab} onPress={() => router.push('/forminputlocation')}>
                <View style={styles.fabInner}>
                    <FontAwesome name="plus" size={24} color="#951B1F" />
                </View>
            </TouchableOpacity>
        </View>
    );
}


/* ========================
     STYLING UI PREMIUM
======================== */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        backgroundColor: '#F4EFE7', // krem klasik
    },

    webview: {
        flex: 1,
        borderRadius: 12,
        margin: 8,
        overflow: 'hidden',
    },

    fab: {
        position: 'absolute',
        right: 22,
        bottom: 30,
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#1C3D6E', // biru budaya
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 5,
    },

    fabInner: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: '#FFD700', // emas
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
});
