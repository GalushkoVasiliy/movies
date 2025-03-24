import { useFetchMoviesByCategoryMutation, useFetchMoviesByGenreMutation } from "@/api/api";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import VerticalList from "@/components/VerticalList";
import CustomHeader from "@/components/CustomHeader";
import COLORS from "@/config/COLORS";
import HeaderButton from "@/components/HeaderButton";
import { MovieCategory } from "@/interfaces/interfaces";

type ListParams = {
  type?: MovieCategory;
  genreId?: string;
  genreName?: string;
};

const List = () => {
  const { type, genreId, genreName } = useLocalSearchParams<ListParams>();
  const [fetchMoviesByCategory] = useFetchMoviesByCategoryMutation();
  const [fetchMoviesByGenre] = useFetchMoviesByGenreMutation();

  const router = useRouter();

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadMovies = async (
    pageNumber = 1,
    isRefreshing = false
  ) => {
    let response: Awaited<ReturnType<typeof fetchMoviesByCategory | typeof fetchMoviesByGenre>>['data'];
    try {
      if (type) {
        response = await fetchMoviesByCategory({ category: type, page: pageNumber }).unwrap();
      } else if (genreId) {
        response = await fetchMoviesByGenre({ genreId, page: pageNumber }).unwrap();
      }
  
      if (!response?.results) {
        console.warn("No results in response", response);
        return;
      }
  
      setMovies(prev =>
        isRefreshing ? response.results : [...prev, ...response.results]
      );
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

  const onLoadMore = useCallback(async () => {
    if (loadingMore) return;
  
    setLoadingMore(true);
  
    const nextPage = page + 1;
    await loadMovies(nextPage);
  
    setPage((prev) => prev + 1);
    setLoadingMore(false);
  }, [page]);

  return (
    <View style={styles.container}>
      <CustomHeader
        leftContent={<HeaderButton iconName='arrow-back' onPress={() => router.back()} />}
        centerContent={
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{type || genreName}</Text>
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
    textTransform: 'capitalize',
    paddingHorizontal: 10
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.main,
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