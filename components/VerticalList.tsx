import { FlatList, RefreshControl, StyleSheet } from "react-native";
import ListItem from "./ListItem";
import { Movie } from "@/interfaces/interfaces";
import { useCallback } from "react";
import COLORS from "@/config/COLORS";

interface VerticalListProps {
  movies: Movie[];
  refreshing?: boolean;
  onRefresh?: () => void;
  onLoadMore?: () => void;
}

const VerticalList: React.FC<VerticalListProps> = ({
  movies,
  refreshing = false,
  onRefresh,
  onLoadMore = () => {},
}) => {
  const renderItem = useCallback(({ item }: { item: Movie }) => {
    return <ListItem item={item} />;
  }, []);

  const keyExtractor = useCallback((item: Movie) => {
    return item.id.toString();
  }, []);

  return (
    <FlatList
      style={styles.list}
      showsVerticalScrollIndicator={false}
      data={movies}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ) : undefined
      }
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default VerticalList;

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: COLORS.main,
  },
});
