import { Shadow } from 'react-native-shadow-2';
import { useFetchMovieByIdMutation, useGetSingleFilmCreditsMutation } from "@/api/api";
import { MovieCredits, MovieDetails } from "@/interfaces/interfaces";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomHeader from "@/components/CustomHeader";
import { IMAGE_URI_BIG_SIZE } from '@/config/CONSTANT';
import HorizontalCarousel from '@/components/HorizontalCarousel';
import { useRouter } from 'expo-router';
import { useToggleFavorite } from '@/hooks/useToggleFavoriteHook';
import COLORS from '@/config/COLORS';
import HeaderButton from '@/components/HeaderButton';
import moment from 'moment';

const Details = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [fetchMovieById, fetchMovieByIdResult] = useFetchMovieByIdMutation();
  const [fetchCredits, fetchCreditsResult] = useGetSingleFilmCreditsMutation();

  const { isFavorite, toggleFavorite } = useToggleFavorite(fetchMovieByIdResult?.data);

  const movie: MovieDetails = fetchMovieByIdResult?.data;
  const movieCredits: MovieCredits = fetchCreditsResult?.data?.cast || [];

  useEffect(() => {
    if (id) {
      fetchMovieById(id).unwrap();
      fetchCredits(id).unwrap();
    }

    return () => {
      fetchMovieByIdResult.reset();
      fetchCreditsResult.reset();
    }
  }, [id]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <CustomHeader
          leftContent={<HeaderButton iconName='arrow-back' onPress={() => router.back()} />}
          rightContent={<HeaderButton iconName={isFavorite ? "heart-sharp" : "heart-outline"} onPress={toggleFavorite} />}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
        <Image resizeMode='contain' source={{uri: `${IMAGE_URI_BIG_SIZE}${movie?.poster_path}`}} style={{width: '100%', height: 660}} />
        <Shadow
          distance={80}
          startColor="rgba(12, 17, 23, 1)"
          endColor="rgba(12, 17, 23, .0001)"
          offset={[0, -30]}
          style={styles.shadowOverlay}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{movie?.title}</Text>
          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <Text style={styles.detailText}>{movie?.vote_average}</Text>
              <Ionicons name="star" size={14} color="yellow" />
            </View>
            <Text style={styles.detailText}>{movie?.runtime} min</Text>
            <Text style={styles.detailText}>{moment(movie?.release_date).year()}</Text>
          </View>

          <View style={styles.genreContainer}>
            {movie?.genres.map((genre: {id: number; name: string}) => (
              <View key={genre.id} style={styles.genreBadge}>
                <Text style={styles.genreText}>{genre.name}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.overview}>{movie?.overview}</Text>
          <View style={styles.castContainer}>
            <Text style={styles.castTitle}>Cast</Text>
            <HorizontalCarousel
              type="cast"
              data={movieCredits?.cast || []}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  castContainer: { gap: 10},
  shadowOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 200, 
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    position: "absolute",
    zIndex: 100,
    width: "100%",
    backgroundColor: "transparent",
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: COLORS.main,
  },
  poster: {
    width: "100%",
    height: 660,
    borderRadius: 20,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    gap: 20,
    top: -40,
  },
  title: {
    color: COLORS.white,
    fontSize: 30,
    fontWeight: "700",
    fontFamily: 'Montserrat',
  },
  detailsRow: {
    flexDirection: "row",
    gap: 10,
  },
  detailItem: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  detailText: {
    color: COLORS.grey,
    fontSize: 14,
    fontWeight: "500",
    fontFamily: 'Montserrat',
  },
  genreContainer: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  genreBadge: {
    backgroundColor: "#3456FF",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
  },
  genreText: {
    color: "white",
    fontWeight: "500",
  },
  overview: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 20,
    fontFamily: 'Montserrat',
  },
  castTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Montserrat',
  },
  
});

export default Details;
