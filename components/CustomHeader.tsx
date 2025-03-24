import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

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
  return (
    <View>
      <View style={[styles.container]}>
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
    height: 100,
    flexDirection: 'row',
  },
});

export default React.memo(CustomHeader);
