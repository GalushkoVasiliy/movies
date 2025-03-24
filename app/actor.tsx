import { useGetMoviesByPersonMutation, useGetPersonByIdMutation } from '@/api/api';
import CustomHeader from '@/components/CustomHeader';
import HeaderButton from '@/components/HeaderButton';
import ListItem from '@/components/ListItem';
import COLORS from '@/config/COLORS';
import { IMAGE_URI_SMALL_SIZE } from '@/config/CONSTANT';
import { Movie } from '@/interfaces/interfaces';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { View, Image, StyleSheet, FlatList, Text, ActivityIndicator } from 'react-native';

const Actor: React.FC = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [getMoviesByPerson, moviesResult] = useGetMoviesByPersonMutation();
  const [getPersonById, personResult] = useGetPersonByIdMutation();

  const { data: person, isLoading: isPersonLoading } = personResult;
  const { data: movies, isLoading: isMoviesLoading } = moviesResult;

  useEffect(() => {
    if (id) {
      getPersonById(id).unwrap(),
      getMoviesByPerson(id).unwrap()
    }

    return () => {
      personResult.reset();
      moviesResult.reset();
    };
  }, [id]);

  const renderItem = useCallback(({ item }: { item: Movie }) => {
    return <ListItem item={item} />;
  }, []);

  const renderHeader = () => {
    if (!person) return null;

    return (
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Image
            source={{ uri: `${IMAGE_URI_SMALL_SIZE}${person.profile_path}` }}
            style={styles.avatar}
          />
          <View style={styles.headerText}>
            <Text style={styles.name}>{person.name}</Text>
            <Text style={styles.info}>{person.birthday}</Text>
            <Text style={styles.info}>{person.place_of_birth}</Text>
          </View>
        </View>
        {person.biography && <Text style={styles.biography}>{person.biography}</Text>}
      </View>
    );
  };

  if (isPersonLoading || isMoviesLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.white} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeader leftContent={<HeaderButton iconName='arrow-back' onPress={router.back} />} />
      
      <FlatList
        showsVerticalScrollIndicator={false}
        data={movies?.cast || []}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.main,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.main,
  },
  header: {
    padding: 15,
    marginTop: 20,
    gap: 20,
  },
  headerInfo: {
    flexDirection: 'row',
    gap: 10,
  },
  avatar: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  headerText: {
    justifyContent: 'center',
    gap: 5,
  },
  name: {
    fontSize: 24,
    color: COLORS.white,
    fontFamily: 'Montserrat',
    fontWeight: '600',
  },
  info: {
    fontSize: 12,
    color: COLORS.grey,
    fontFamily: 'Montserrat',
    fontWeight: '600',
  },
  biography: {
    fontSize: 12,
    color: COLORS.grey,
    fontFamily: 'Montserrat',
  },
});

export default Actor;
