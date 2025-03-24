import Ionicons from '@expo/vector-icons/Ionicons';
import { BlurView } from 'expo-blur';
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

interface HeaderButtonProps {
  onPress: () => void;
  iconName: string; 
}

const HeaderButton: React.FC<HeaderButtonProps> = ({ onPress, iconName }) => {
  return (
    <BlurView intensity={90} style={styles.blurContainer}>
      <TouchableOpacity onPress={onPress} style={styles.headerButton}>
        <Ionicons name={iconName} size={25} color="white" />
      </TouchableOpacity>
    </BlurView>
  );
};

const styles = StyleSheet.create({
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

export default HeaderButton;