import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiText, MotiView } from 'moti';
import { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

interface Movie {
  id: number;
  title: string;
  image: string;
  rating: number;
  duration: string;
  genre: string;
  releaseDate: string;
  description: string;
}

const featuredMovies: Movie[] = [
  {
    id: 1,
    title: "Avengers: Endgame",
    image: "https://image.tmdb.org/t/p/original/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    rating: 9.2,
    duration: "3h 1m",
    genre: "Action, Adventure",
    releaseDate: "2024-05-15",
    description: "After the devastating events of Avengers: Infinity War, the universe is in ruins...",
  },
  {
    id: 2,
    title: "Spider-Man: Across the Spider-Verse",
    image: "https://m.media-amazon.com/images/M/MV5BNThiZjA3MjItZGY5Ni00ZmJhLWEwN2EtOTBlYTA4Y2E0M2ZmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    rating: 8.8,
    duration: "2h 20m",
    genre: "Animation, Action",
    releaseDate: "2024-05-20",
    description: "Miles Morales returns for the next chapter of the Oscar-winning Spider-Verse saga...",
  },
];

const upcomingMovies: Movie[] = [
  {
    id: 1,
    title: "Dune: Part Two",
    image: "https://image.tmdb.org/t/p/original/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    rating: 8.5,
    duration: "2h 46m",
    genre: "Sci-Fi, Adventure",
    releaseDate: "2024-07-15",
    description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators...",
  },
  {
    id: 2,
    title: "Spider-Man: Across the Spider-Verse",
    image: "https://m.media-amazon.com/images/M/MV5BNThiZjA3MjItZGY5Ni00ZmJhLWEwN2EtOTBlYTA4Y2E0M2ZmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    rating: 8.8,
    duration: "2h 20m",
    genre: "Animation, Action",
    releaseDate: "2024-05-20",
    description: "Miles Morales returns for the next chapter of the Oscar-winning Spider-Verse saga...",
  },
];

const MovieCard = ({ movie, onPress }: { movie: Movie; onPress: () => void }) => (
  <TouchableOpacity onPress={onPress} style={styles.movieCard}>
    <Image
      source={{ uri: movie.image }}
      style={styles.movieImage}
      contentFit="cover"
    />
    <LinearGradient
      colors={['transparent', 'rgba(0,0,0,0.8)']}
      style={styles.movieGradient}
    >
      <View style={styles.movieInfo}>
        <MotiText style={styles.movieTitle}>{movie.title}</MotiText>
        <View style={styles.movieDetails}>
          <View style={styles.ratingContainer}>
            <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
            <MotiText style={styles.ratingText}>{movie.rating}</MotiText>
          </View>
          <MotiText style={styles.durationText}>{movie.duration}</MotiText>
        </View>
      </View>
    </LinearGradient>
  </TouchableOpacity>
);

const StatCard = ({ title, value, icon }: { title: string; value: string; icon: keyof typeof MaterialCommunityIcons.glyphMap }) => (
  <MotiView
    from={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ type: 'timing', duration: 500 }}
    style={styles.statCard}
  >
    <View style={styles.statContent}>
      <View>
        <MotiText style={styles.statTitle}>{title}</MotiText>
        <MotiText style={styles.statValue}>{value}</MotiText>
      </View>
      <MaterialCommunityIcons name={icon} size={32} color="#FF4B4B" />
    </View>
  </MotiView>
);

export default function HomeScreen() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  return (
    <ScrollView style={styles.container}>
      <MotiView style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="fire" size={32} color="#FF4B4B" />
          <MotiText style={styles.sectionTitle}>Featured Movies</MotiText>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.movieScroll}>
          {featuredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onPress={() => setSelectedMovie(movie)}
            />
          ))}
        </ScrollView>
      </MotiView>

      {/* Quick Stats Section */}
      <MotiView style={styles.statsContainer}>
        <StatCard title="Total Movies" value="150+" icon="film" />
        <StatCard title="Active Theaters" value="25" icon="map-marker" />
        <StatCard title="Today's Shows" value="45" icon="clock" />
        <StatCard title="Booked Tickets" value="1.2k" icon="ticket" />
      </MotiView>

      {/* Coming Soon Section */}
      <MotiView style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="calendar" size={32} color="#4B7BFF" />
          <MotiText style={styles.sectionTitle}>Coming Soon</MotiText>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.movieScroll}>
          {upcomingMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onPress={() => setSelectedMovie(movie)}
            />
          ))}
        </ScrollView>
      </MotiView>

      {/* Movie Details Modal */}
      {selectedMovie && (
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={styles.modal}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setSelectedMovie(null)}
          >
            <MotiView
              from={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={styles.modalContent}
            >
              <Image
                source={{ uri: selectedMovie.image }}
                style={styles.modalImage}
                contentFit="cover"
              />
              <View style={styles.modalInfo}>
                <MotiText style={styles.modalTitle}>{selectedMovie.title}</MotiText>
                <View style={styles.modalDetails}>
                  <View style={styles.modalDetail}>
                    <MaterialCommunityIcons name="star" size={20} color="#FFD700" />
                    <MotiText style={styles.modalText}>{selectedMovie.rating}</MotiText>
                  </View>
                  <View style={styles.modalDetail}>
                    <MaterialCommunityIcons name="clock" size={20} color="#FFFFFF" />
                    <MotiText style={styles.modalText}>{selectedMovie.duration}</MotiText>
                  </View>
                  <View style={styles.modalDetail}>
                    <MaterialCommunityIcons name="calendar" size={20} color="#FFFFFF" />
                    <MotiText style={styles.modalText}>{selectedMovie.releaseDate}</MotiText>
                  </View>
                </View>
                <MotiText style={styles.modalDescription}>{selectedMovie.description}</MotiText>
                <TouchableOpacity style={styles.bookButton}>
                  <MaterialCommunityIcons name="ticket" size={20} color="#FFFFFF" />
                  <MotiText style={styles.bookButtonText}>Select Showtime</MotiText>
                </TouchableOpacity>
              </View>
            </MotiView>
          </TouchableOpacity>
        </MotiView>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030014',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(17, 17, 17, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  navIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  movieScroll: {
    marginHorizontal: -16,
  },
  movieCard: {
    width: Dimensions.get('window').width * 0.8,
    height: 400,
    marginHorizontal: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  movieImage: {
    width: '100%',
    height: '100%',
  },
  movieGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  movieInfo: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  movieDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 16,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statTitle: {
    color: '#999999',
    fontSize: 14,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    overflow: 'hidden',
  },
  modalImage: {
    width: '100%',
    height: 200,
  },
  modalInfo: {
    padding: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  modalDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  modalDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  modalText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  modalDescription: {
    color: '#CCCCCC',
    fontSize: 16,
    marginBottom: 16,
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF4B4B',
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
