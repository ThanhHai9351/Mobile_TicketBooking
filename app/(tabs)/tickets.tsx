import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MotiText, MotiView } from 'moti';
import { StyleSheet, View } from 'react-native';

export default function TicketsScreen() {
    return (
        <View style={styles.container}>
            <MotiView
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: 500 }}
                style={styles.content}
            >
                <MaterialCommunityIcons name="ticket-outline" size={64} color="#666666" />
                <MotiText style={styles.title}>Your Tickets</MotiText>
                <MotiText style={styles.subtitle}>No tickets found</MotiText>
                <MotiText style={styles.description}>
                    Book your movie tickets and they will appear here
                </MotiText>
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
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginTop: 16,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 18,
        color: '#999999',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: '#666666',
        textAlign: 'center',
        paddingHorizontal: 32,
    },
}); 