import { useGetPopularMoviesQuery, useGetTopRatedMoviesQuery, useSearchMoviesMutation } from "@/api/api";
import HorizontalCarousel from "@/components/HorizontalCarousel";
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from 'expo-router';
import CustomHeader from "@/components/CustomHeader";
import Search from "@/components/Search";
import { BlurView } from "expo-blur";
// import Filters from "@/components/Filters";
import COLORS from "@/config/COLORS";
import HeaderButton from "@/components/HeaderButton";
import { useState } from "react";
import VerticalList from "@/components/VerticalList";
import { Movie } from "@/interfaces/interfaces";

export default function Index() {
  const popularFilms = useGetPopularMoviesQuery('');
  const topRatedFilms = useGetTopRatedMoviesQuery('');
  const [searchMovies, searchMoviesResult] = useSearchMoviesMutation();
  const router = useRouter();

  const [searchResult, setSearchResult] = useState<Movie[]>([]);

  const navigateToFavorite = () => {
    router.push({ pathname: '/FavoriteList', params: { type: 'favorite' } });
  }

  const search = async (string: any) => {
    const res = await searchMovies(string).unwrap();
    if (res) {
      setSearchResult(res.results);
    }
  }

  // const filter = () => {

  // }

  return (
    <View style={styles.wrapper}>
      {/* <Filters /> */}
      <CustomHeader
        // leftContent={<HeaderButton iconName='filter' onPress={filter} />}
        rightContent={<HeaderButton iconName='heart-sharp' onPress={navigateToFavorite} />
        }
        additionalContent={
          <BlurView intensity={20} style={styles.searchContainer}>
            <Search clearSearch={() => {
              searchMoviesResult.reset();
              setSearchResult([]);
            }} onPress={search} />
          </BlurView>
        }
      />
      {searchResult && searchResult.length > 0 ? (
        <VerticalList movies={searchResult} />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.wrapper}>
          <View style={styles.bannerContainer}>
            <Image style={styles.bannerImage} source={require('@/assets/images/banner.png')} />
          </View>
          <View>
            <View style={styles.groupHeaderContainer}>
              <Text style={styles.groupTitle}>Popular</Text>
              <TouchableOpacity onPress={() => {
                router.push({ pathname: '/FilmsList', params: { type: 'popular' } });
              }}>
                <Text style={styles.seeAllButton}>View all</Text>
              </TouchableOpacity>
            </View>
            <HorizontalCarousel type="movies" data={popularFilms.data?.results || []} />
          </View>

          <View>
            <View style={styles.groupHeaderContainer}>
              <Text style={styles.groupTitle}>Top Rated</Text>
              <TouchableOpacity onPress={() => {
                router.push({ pathname: '/FilmsList', params: { type: 'top_rated' } });
              }}>
                <Text style={styles.seeAllButton}>View all</Text>
              </TouchableOpacity>
            </View>
            <HorizontalCarousel type="movies" data={topRatedFilms.data?.results || []} />
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    width: '100%',
    height: 50,
    borderRadius: 15,
    overflow: 'hidden'
  },
  bannerContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
    width: '100%',
    padding: 15,
  },
  bannerImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
  },
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.main,
  },
  groupHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15
  },
  groupTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.white,
    fontFamily: 'Montserrat',
  },
  seeAllButton: {
    color: COLORS.grey,
    textTransform: 'uppercase',
    fontFamily: 'Montserrat',
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
});
