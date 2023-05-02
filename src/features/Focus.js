import { React, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { spacing } from '../utils/sizes'
import RoundedButton from '../components/RoundedButton'

const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} onChangeText={setSubject} label="What Would You Like To Focus On?" />
        <View style={styles.button}>
          <RoundedButton title='+' size={50} onPress={() => addSubject(subject)}/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // removed flex so that this only takes up the space that it actually requires, to make room for FocusHistory component
  },
  inputContainer: {
    padding: spacing.lg,
    justifyContent: 'top',
    flexDirection: 'row'
  },
  textInput: {
    flex: 1,
    marginRight: spacing.sm 
  },
  button: {
    justifyContent: 'center'
  }
});

export default Focus;
