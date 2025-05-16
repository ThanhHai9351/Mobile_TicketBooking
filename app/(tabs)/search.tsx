import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MotiText, MotiView } from 'moti';
import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export default function SearchScreen() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <MaterialCommunityIcons name="magnify" size={24} color="#666666" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search movies..."
                    placeholderTextColor="#666666"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
            <MotiView
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: 500 }}
                style={styles.content}
            >
                <MotiText style={styles.title}>Search Movies</MotiText>
                <MotiText style={styles.subtitle}>Find your favorite movies</MotiText>
            </MotiView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#030014',
        padding: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        padding: 12,
        marginTop: 16,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        color: '#FFFFFF',
        fontSize: 16,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#999999',
    },
}); 