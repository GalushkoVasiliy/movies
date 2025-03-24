import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface CustomHeaderProps {
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  centerContent?: ReactNode;
  additionalContent?: ReactNode;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  leftContent,
  rightContent,
  centerContent,
  additionalContent
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View>
      <View style={[styles.container, {height: 40 + insets.top}]}>
        {leftContent}
        {centerContent}
        {rightContent}
      </View>
      {additionalContent && (
        <View style={{marginVertical: 20, paddingHorizontal: 15}}>
          {additionalContent}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export default React.memo(CustomHeader);
