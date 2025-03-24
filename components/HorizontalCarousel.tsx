import React, { useCallback } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import CarouselItem from "./CarouselItem";
import { CastMember, Movie } from "@/interfaces/interfaces";
import { HORIZONTAL_STACK_CONFIG_BIG, HORIZONTAL_STACK_CONFIG_SMALL } from "@/config/CONSTANT";

interface HorizontalCarouselProps {
  type: 'movies' | 'cast';
  data?: Movie[] | CastMember[];
}

const HorizontalCarousel = ({data = [], type}: HorizontalCarouselProps) => {
  const carouselConfig = type === 'movies' ? HORIZONTAL_STACK_CONFIG_BIG : HORIZONTAL_STACK_CONFIG_SMALL;
  const progress = useSharedValue<number>(0);
  const renderItem = useCallback(({ item }: { item: any }) => {
    return (<CarouselItem type={type} item={item} />)
  }, [type]);

  return (
    <Carousel
      autoPlayInterval={2000}
      data={data}
      height={carouselConfig.height}
      loop={carouselConfig.loop}
      snapEnabled={true}
      width={carouselConfig.width}
      style={styles.carousel}
      onProgressChange={progress}
      overscrollEnabled={true} 
      renderItem={renderItem}
    />
  )
};

const styles = StyleSheet.create({
  carousel: {
    width: Dimensions.get("window").width, 
  }
});

export default React.memo(HorizontalCarousel);
