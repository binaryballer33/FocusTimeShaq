import React, { useState } from 'react';
import {
  SafeAreaView,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { colors } from './src/utils/colors';
import Focus from './src/features/Focus';
import FocusHistory from './src/features/FocusHistory';
import Timer from './src/features/Timer';

export default function App() {
  const [currentSubject, setCurrentSubject] = useState();
  const [history, setHistory] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      {!currentSubject ? (
        <>
          <Focus addSubject={setCurrentSubject}/>
          <FocusHistory history={history} />
        </>
      ) : (
        <Timer 
          focusSubject={currentSubject}
          onTimerEnd={(subject) => {setHistory([...history, subject])}}
          clearSubject={() => setCurrentSubject(null)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // this is a way to avoid the status bar in android, done by default in IOS when using SafeAreaView
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: colors.darkBlue,
  },
});
