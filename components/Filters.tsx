import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useGetGenresMutation } from '@/api/api';
import { RootState } from '@/store';
import { addGenresList } from '@/store/reducers/genres';
import COLORS from '@/config/COLORS';

const generateYears = (start = 1980): number[] => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= start; year--) {
    years.push(year);
  }
  return years;
};

const Filters: React.FC = () => {
  const [genresRequest] = useGetGenresMutation();
  const { genres } = useSelector((state: RootState) => state.genres);
  const dispatch = useDispatch();
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const getGenresList = async () => {
    try {
      const res = await genresRequest('').unwrap();
      if (res && res.genres) {
        dispatch(addGenresList(res.genres));
      }
    } catch (error) {
      console.error("Error getting genres:", error);
    }
  };

  useEffect(() => {
    if (!genres.length) {
      getGenresList();
    }
  }, []);

  const toggleGenre = (id: number) => {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const clearFilters = () => {
    setSelectedGenres([]);
  };

  const renderGenreItem = ( item : any) => {
    const isSelected = selectedGenres.includes(item.id);

    return (
      <TouchableOpacity
        style={[styles.genreItem, isSelected && styles.selectedItem]}
        onPress={() => toggleGenre(item.id)}
      >
        <Text style={[styles.genreText, isSelected && styles.selectedText]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Filters</Text>
        {(selectedGenres.length > 0) && (
          <TouchableOpacity onPress={clearFilters}>
            <Text style={styles.clearButton}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.sectionTitle}>Genre</Text>
      <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 10}}>
        {genres.map((item) => renderGenreItem(item))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: COLORS.main,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "600",
    fontFamily: 'Montserrat'
  },
  clearButton: {
    color: "#3456FF",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: 'Montserrat'
  },
  sectionTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
    marginTop: 10,
    fontFamily: 'Montserrat'
  },
  genreItem: {
    backgroundColor: "#1C1F26",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedItem: {
    backgroundColor: "#3456FF",
  },
  genreText: {
    color: "white",
    fontWeight: "500",
    fontFamily: 'Montserrat'
  },
  selectedText: {
    fontWeight: "700",
  },
});

export default Filters;
