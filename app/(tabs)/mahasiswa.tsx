import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { SectionList, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const DATA = [
    {
        title: 'Kelas A',
        data: ['Angel', 'Cece', 'Myla', 'Amel', 'Arin', 'Gita'],
    },
    {
        title: 'Kelas B',
        data: ['Galuh', 'Zahra', 'Alifah', 'Atika', 'Meiva'],
    },
    {
        title: 'Asisten',
        data: ['Syaiful', 'Hayyu', 'Vero', 'Rini'],
    },
];

const App = () => (
    <SafeAreaProvider>
        <SafeAreaView style={styles.container} edges={['top']}>
            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.title}>
                            <MaterialIcons name="person" size={24} color="#000000" />
                            {' '}
                            {item}
                            </Text>
                    </View>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>{title}</Text>
                )}
            />
        </SafeAreaView>
    </SafeAreaProvider>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginHorizontal: 16,
        marginVertical: 16,
    },
    item: {
        backgroundColor: '#a5b7b7ff',
        padding: 5,
        marginVertical: 8,
        borderRadius: 8,
    },
    header: {
        fontSize: 30,
        fontWeight: '600',
        marginTop: 12,
    },
    title: {
        fontSize: 24,
    },
});

export default App;