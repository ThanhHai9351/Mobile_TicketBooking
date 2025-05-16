import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { MotiText, MotiView } from 'moti';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function WelcomeScreen() {
    useEffect(() => {
        let mounted = true;

        const timer = setTimeout(async () => {
            if (mounted) {
                try {
                    await SplashScreen.hideAsync();
                    router.replace('/(tabs)');
                } catch (error) {
                    console.warn('Error during navigation:', error);
                }
            }
        }, 3500);

        return () => {
            mounted = false;
            clearTimeout(timer);
        };
    }, []);

    return (
        <View style={styles.container}>
            <MotiView
                from={{
                    scale: 0.5,
                    opacity: 0,
                }}
                animate={{
                    scale: 1,
                    opacity: 1,
                }}
                transition={{
                    type: 'timing',
                    duration: 1000,
                }}
                style={styles.logoContainer}
            >
                <MotiView
                    from={{
                        scale: 0.8,
                        rotate: '-10deg',
                    }}
                    animate={{
                        scale: 1,
                        rotate: '0deg',
                    }}
                    transition={{
                        type: 'spring',
                        delay: 1000,
                        duration: 1000,
                    }}
                    style={styles.logo}
                >
                    <MaterialCommunityIcons name="movie-roll" size={80} color="#FF4B4B" />
                </MotiView>
            </MotiView>

            <MotiText
                from={{
                    opacity: 0,
                    translateY: 20,
                }}
                animate={{
                    opacity: 1,
                    translateY: 0,
                }}
                transition={{
                    type: 'timing',
                    delay: 1500,
                    duration: 1000,
                }}
                style={styles.title}
            >
                Movie Booking
            </MotiText>

            <MotiText
                from={{
                    opacity: 0,
                    translateY: 20,
                }}
                animate={{
                    opacity: 1,
                    translateY: 0,
                }}
                transition={{
                    type: 'timing',
                    delay: 2000,
                    duration: 1000,
                }}
                style={styles.subtitle}
            >
                Book your favorite movies
            </MotiText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A1A',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 150,
        height: 150,
        backgroundColor: '#2A2A2A',
        borderRadius: 75,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#FF4B4B',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#CCCCCC',
        textAlign: 'center',
    },
}); 