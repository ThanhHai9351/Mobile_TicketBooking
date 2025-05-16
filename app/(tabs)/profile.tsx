import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MotiText, MotiView } from 'moti';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <MotiView
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: 500 }}
                style={styles.content}
            >
                <View style={styles.avatarContainer}>
                    <MaterialCommunityIcons name="account-circle" size={100} color="#666666" />
                    <MotiText style={styles.username}>Guest User</MotiText>
                </View>

                <View style={styles.menuContainer}>
                    <TouchableOpacity style={styles.menuItem}>
                        <MaterialCommunityIcons name="account-outline" size={24} color="#FFFFFF" />
                        <MotiText style={styles.menuText}>Edit Profile</MotiText>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <MaterialCommunityIcons name="cog-outline" size={24} color="#FFFFFF" />
                        <MotiText style={styles.menuText}>Settings</MotiText>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <MaterialCommunityIcons name="help-circle-outline" size={24} color="#FFFFFF" />
                        <MotiText style={styles.menuText}>Help & Support</MotiText>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <MaterialCommunityIcons name="logout" size={24} color="#FF4444" />
                        <MotiText style={[styles.menuText, styles.logoutText]}>Logout</MotiText>
                    </TouchableOpacity>
                </View>
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
    },
    avatarContainer: {
        alignItems: 'center',
        marginTop: 32,
        marginBottom: 32,
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginTop: 16,
    },
    menuContainer: {
        marginTop: 16,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        marginBottom: 12,
    },
    menuText: {
        fontSize: 16,
        color: '#FFFFFF',
        marginLeft: 16,
    },
    logoutText: {
        color: '#FF4444',
    },
}); 