import COLORS from '@/config/COLORS';
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface SearchProps {
  onPress: (search: string) => void;
  clearSearch: () => void;
}

const Search: React.FC<SearchProps> = ({onPress, clearSearch}) => {
  const [query, setQuery] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={query}
        onChangeText={setQuery}
        placeholderTextColor="#888"
      />
      {query.length > 0 && (
        <TouchableOpacity
          onPress={() => {
            clearSearch();
            setQuery('');
          }}>
          <Ionicons name="close" size={25} color="white" />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={() => onPress(query)}>
        <Ionicons name="search" size={25} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    width: '100%',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    height: 50,
    color: COLORS.white,
    flex: 1,
    fontFamily: 'Montserrat'
  },
});

export default Search;