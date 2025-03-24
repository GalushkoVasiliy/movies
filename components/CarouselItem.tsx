import { useRouter } from "expo-router";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { IMAGE_URI_BIG_SIZE } from "@/config/CONSTANT";
import { CarouselType, CastMember, Movie } from "@/interfaces/interfaces";
import { Image } from 'expo-image';

interface CarouselItemProps {
  item: Movie | CastMember;
  type: CarouselType;
}

const CarouselItem: React.FC<CarouselItemProps> = (props) => {
  const router = useRouter();
  return props.type === CarouselType.MOVIE ? (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => router.push({ pathname: '/FilmDetails', params: { id: props?.item?.id } })}
      style={styles.container}>
      <View style={styles.movieWrapper}>
        <Image
          source={{ uri: `${IMAGE_URI_BIG_SIZE}${props?.item?.poster_path}` }}
          style={styles.image}
          contentFit="cover"
        />
      </View>      
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => router.push({ pathname: '/Actor', params: { id: props?.item?.id } })}
      style={styles.smallContainer}>
      <Image
        source={props?.item?.profile_path ? { uri: `${IMAGE_URI_BIG_SIZE}${props?.item?.profile_path}` } : require('@/assets/images/unknown_person.jpg')}
        style={styles.smallImage}
        contentFit="cover"
      />
      <Text style={styles.text}>{props?.item?.name}</Text>
      <Text style={styles.text}>{props?.item?.popularity?.toFixed(2)}</Text>
    </TouchableOpacity>
  );
}

export default CarouselItem;

const styles = StyleSheet.create({
  smallContainer: {gap: 10, width: '100%'},
  container: {
    width: '100%',
    height: 250,
    alignItems: 'center',
    padding: 10,
  },
  movieWrapper: {width: '100%', height: 220},
  text: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  image: { width: '100%', height: 220, borderRadius: 15 },
  smallImage: { width: 100, height: 150, borderRadius: 10 },
});
