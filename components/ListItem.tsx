import { Movie } from "@/interfaces/interfaces";
import { useRouter } from "expo-router";
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";
import moment from 'moment';
import { IMAGE_URI_SMALL_SIZE } from "@/config/CONSTANT";
import Ionicons from "@expo/vector-icons/Ionicons";
import COLORS from "@/config/COLORS";

const ListItem = ({ item }: { item: Movie }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={() => router.push({ pathname: "/details", params: { id: item.id } })}>
      <View style={styles.content}>
        <Image
          source={{ uri: `${IMAGE_URI_SMALL_SIZE}${item.poster_path}` }}
          style={styles.poster}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.detailsRow}>
            <Text style={styles.detailText}>{item.vote_average}</Text>
            <Ionicons name="star" size={14} color="yellow" />
            <Text style={styles.detailText}>{moment(item.release_date).format("YYYY")}</Text>
            <Text style={styles.detailText}>{item.id}</Text>
          </View>
          <Text style={styles.overview}>{item.overview.slice(0, 160)}...</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.main,
  },
  content: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  infoContainer: {
    marginLeft: 10,
    width: "70%",
    gap: 5,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.white,
    fontFamily: 'Montserrat',
  },
  detailsRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: 'center'
  },
  detailText: {
    color: COLORS.grey,
    fontFamily: 'Montserrat',
  },
  overview: {
    color: COLORS.white,
    fontFamily: 'Montserrat',
    fontSize: 12,
  },
});

export default ListItem;
