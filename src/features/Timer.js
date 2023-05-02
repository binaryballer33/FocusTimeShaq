import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';
import { colors } from '../utils/colors';
import { spacing } from '../utils/sizes'
import Countdown from '../components/Countdown';
import RoundedButton from '../components/RoundedButton';
import Timing from './Timing'

const ONE_SECOND_IN_MS = 1000;

// vibrate then wait a second then vibrate again, does this 5 times, this works differently whether you are on IOS or ANDROID
const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
];

const Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {
  useKeepAwake(); // this is a function from expo that will keep the phone awake while the app Timer is running
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.1);

  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setProgress(1);
    reset();
    onTimerEnd(focusSubject);
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          onProgress={setProgress}
          isPaused={!isStarted}
          onEnd={onEnd}
        />
      
        <View style={{paddingTop: spacing.xxl}}>
          <Text style={styles.title}>Focusing On</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>

      <View style={{paddingTop: spacing.sm}}>
        <ProgressBar color={colors.progressBar} style={{height: spacing.sm}} />
      </View>

      <View style={styles.timingWrapper}>
        <Timing onChangeTime={setMinutes}/>
      </View>

      <View style={styles.buttonWrapper}>
        {!isStarted && <RoundedButton title='Start' onPress={() => setIsStarted(true)}/>}
        {isStarted && <RoundedButton title='Pause' onPress={() => setIsStarted(false)}/>}
      </View>

      <View style={styles.clearSubjectWrapper}><RoundedButton size={50} title='-' onPress={clearSubject} /></View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timingWrapper: {
    flex: 0.1,
    flexDirection: 'row',
    paddingTop: spacing.xxl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearSubjectWrapper: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  task: {
    color: colors.white,
    textAlign: 'center'
  }
})

export default Timer;