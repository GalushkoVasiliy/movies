import { useFetchPopularMoviesMutation, useFetchTopRatedMoviesMutation } from "@/api/api";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import VerticalList from "@/components/VerticalList";
import CustomHeader from "@/components/CustomHeader";
import { BlurView } from "expo-blur";
import Ionicons from "@expo/vector-icons/Ionicons";
import COLORS from "@/config/COLORS";
import HeaderButton from "@/components/HeaderButton";

const List = () => {
  const { type } = useLocalSearchParams();
  const [fetchPopularMovies] = useFetchPopularMoviesMutation();
  const [fetchTopRatedMovies] = useFetchTopRatedMoviesMutation();
  const router = useRouter();

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadMovies = async (pageNumber = 1, isRefreshing = false) => {
    try {
      let response;
      
      if (type === "popular") {
        response = await fetchPopularMovies(pageNumber).unwrap();
      } else if (type === "top_rated") {
        response = await fetchTopRatedMovies(pageNumber).unwrap();
      }
    
      if (response?.results) {
        setMovies((prevMovies) => 
          isRefreshing ? response.results : [...prevMovies, ...response.results]
        );
      } else {
        console.error("Error: response.results is undefined", response);
      }
    } catch (error) {
      console.error("Error loading movies:", error);
    }
  };

  useEffect(() => {
    setMovies([]);
    setPage(1);
    loadMovies(1, true);
  }, [type]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadMovies(1, true);
    setRefreshing(false);
  };

  const onLoadMore = async () => {
    if (!loadingMore) {
      setLoadingMore(true);
      const nextPage = page + 1;
      await loadMovies(nextPage);
      setPage(nextPage);
      setLoadingMore(false);
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        leftContent={<HeaderButton iconName='arrow-back' onPress={() => router.back()} />}
        centerContent={
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Favorite</Text>
          </View>
        }
        rightContent={
          <View style={styles.headerButton} />
        }
      />
      <View style={styles.listContainer}>
        <VerticalList 
          movies={movies || []}
          refreshing={refreshing}
          onRefresh={onRefresh}
          onLoadMore={onLoadMore}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Montserrat',
    color: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.main,
    paddingTop: 25
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  blurContainer: {
    textAlign: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 15,
  },
  listContainer: {
    flex: 1,
    paddingTop: 20,
  },
})

export default List;