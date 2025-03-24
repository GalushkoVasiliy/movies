import CustomHeader from '@/components/CustomHeader';
import HeaderButton from '@/components/HeaderButton';
import VerticalList from '@/components/VerticalList';
import COLORS from '@/config/COLORS';
import { RootState } from '@/store';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';

const Favorite: React.FC = () => {
  const {movies} = useSelector((state: RootState) => state.movies);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <CustomHeader
        leftContent={<HeaderButton iconName='arrow-back' onPress={() => router.back()} />}
        centerContent={
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Favorite</Text>
          </View>
        }
        rightContent={<View />}
      />
      <View style={styles.listContainer}>
        <VerticalList
          movies={movies || []}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: { justifyContent: 'center', alignItems: 'center', height: 40, },
  title: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Montserrat',
    color: COLORS.white,
  },
  listContainer: {
    flex: 1,
    paddingTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.main,
  },
});

export default Favorite;
