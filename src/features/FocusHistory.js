import React from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { colors } from '../utils/colors';
import { fontSizes, spacing } from '../utils/sizes';

const FocusHistory = ({ history }) => {
  if(!history || !history.length) return <Text style={styles.title}>We Have Not Focused On Anything Yet</Text>;

  const renderItem = ({ item }) => <Text style={styles.item}>- {item}</Text>

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Things We Have Focused On:</Text>
    
      <FlatList 
        data={history}
        renderItem={renderItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    flex: 1, // helps with scrollability
  },
  item: {
    fontSizes: fontSizes.md,
    color: colors.white,
    paddingTop: spacing.sm
  },
  title: {
    color: colors.white,
    fontSize: fontSizes.md,
    padding: spacing.md,
    fontWeight: 'bold'
  }
})

export default FocusHistory;
