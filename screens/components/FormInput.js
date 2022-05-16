import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import { COLORS } from '../../constants/theme';

const FormInput = ({
  labelText = '',
  placeholderText = '',
  onChangeText = null,
  value = null,
  ...more
}) => {
  return (
    <View style={styles.view}>
      <Text>{labelText}</Text>
      <TextInput
        style={styles.textInput}
        placeholder={placeholderText}
        onChangeText={onChangeText}
        value={value}
        {...more}
      />
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  view: {
    width: '100%',
    marginBottom: 20,
  },
  textInput: {
    padding: 10,
    borderColor: COLORS.black + '20',
    borderWidth: 1,
    width: '100%',
    borderRadius: 5,
    marginTop: 10,
  },
});
