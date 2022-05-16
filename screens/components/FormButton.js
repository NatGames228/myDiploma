import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import { COLORS } from '../../constants/theme';

const FormButton = ({
  labelText = '',
  handleOnPress = null,
  style,
  isPrimary = true,
  ...more
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.touchableOpacity,
        {
          backgroundColor: isPrimary ? COLORS.primary : COLORS.white,
          ...style,
        }
      ]}
      activeOpacity={0.9}
      onPress={handleOnPress}
      {...more}>
      <Text
        style={[
          styles.text,
          { color: isPrimary ? COLORS.white : COLORS.primary }
        ]}>
        {labelText}
      </Text>
    </TouchableOpacity>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  touchableOpacity: {
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 5,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
  }
});
