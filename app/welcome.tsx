import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { MotiText, MotiView } from 'moti';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming
} from 'react-native-reanimated';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const TypewriterText = ({ text, style }: { text: string, style: any }) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timer = setTimeout(() => {
                setDisplayText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, 260);
            return () => clearTimeout(timer);
        }
    }, [currentIndex, text]);

    return (
        <MotiText style={style}>
            {displayText}
            <MotiText
                animate={{
                    opacity: [1, 0],
                }}
                transition={{
                    type: 'timing',
                    duration: 500,
                    loop: true,
                }}
            >
                |
            </MotiText>
        </MotiText>
    );
};

const BackgroundEffect = () => {
    const pulse = useSharedValue(0);

    useEffect(() => {
        pulse.value = withRepeat(
            withSequence(
                withTiming(1, { duration: 2000 }),
                withTiming(0, { duration: 2000 })
            ),
            -1
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: pulse.value * 0.3,
    }));

    return (
        <View style={StyleSheet.absoluteFill}>
            <LinearGradient
                colors={['rgba(255, 75, 75, 0.2)', 'rgba(255, 165, 0, 0.2)']}
                style={[StyleSheet.absoluteFill, { transform: [{ scale: 1.5 }] }]}
            />
            <Animated.View
                style={[
                    StyleSheet.absoluteFill,
                    {
                        backgroundColor: 'rgba(255, 75, 75, 0.1)',
                        transform: [{ scale: 1.2 }],
                    },
                    animatedStyle,
                ]}
            />
        </View>
    );
};

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
        }, 5000);

        return () => {
            mounted = false;
            clearTimeout(timer);
        };
    }, []);

    return (
        <View style={styles.container}>
            <BackgroundEffect />

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

            <MotiView
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
                style={styles.textContainer}
            >
                <MotiText style={styles.welcomeText}>
                    Welcome To H-Cinema
                </MotiText>
            </MotiView>

            <MotiView
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
                style={styles.textContainer}
            >
                <MotiText style={styles.title}>
                    Movie Booking
                </MotiText>
            </MotiView>

            <MotiView
                from={{
                    opacity: 0,
                    scale: 0.8,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                }}
                transition={{
                    type: 'timing',
                    delay: 2500,
                    duration: 1000,
                }}
                style={styles.buttonContainer}
            >
                <View style={styles.button}>
                    <MaterialCommunityIcons name="ticket" size={24} color="#FF4B4B" />
                    <TypewriterText
                        text="Book Your Tickets Now"
                        style={styles.buttonText}
                    />
                </View>
            </MotiView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#030014',
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
    textContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#FF4B4B',
        marginBottom: 10,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10,
    },
    buttonContainer: {
        marginTop: 20,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    buttonText: {
        marginLeft: 10,
        fontSize: 18,
        color: '#FF4B4B',
    }
}); 