import React, {useEffect, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {startCounter} from 'react-native-accurate-step-counter';
import {
  accelerometer,
  gyroscope,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
import {map, filter} from 'rxjs/operators';
import {Double} from 'react-native/Libraries/Types/CodegenTypes';
//** Styles */
import Colors from '../../libs/Colors';
import {styles} from '../../Styles/StepCounterStyles';

interface CounterProps {
  navigation: any;
}
setUpdateIntervalForType(SensorTypes.accelerometer, 4000); // defaults to 100ms

const StepCounter: React.FC<CounterProps> = ({navigation}) => {
  const [steps, setSteps] = useState(0);
  const [startStepCounter, setStartStep] = useState<boolean>(false);
  const [speed, setSpeed] = useState<Double>(0);

  const subscription = accelerometer
    .pipe(
      map(({x, y, z}) => x + y + z),
      filter(speed => speed > 0),
    )
    .subscribe(
      speed => {
        console.log(`You moved your phone with ${speed}`);
        startStepCounter && setSpeed(speed.toFixed(2));
      },
      error => {
        console.log('The sensor is not available');
      },
    );

  setTimeout(() => {
    // If it's the last subscription to accelerometer it will stop polling in the native API
    subscription.unsubscribe();
  }, 1000);

  useEffect(() => {
    const config = {
      default_threshold: 15.0,
      default_delay: 150000000,
      cheatInterval: 3000,
      onStepCountChange: stepCount => {
        setSteps(stepCount);
      },
      onCheat: () => {
        console.log('User is Cheating');
      },
    };
    startStepCounter && startCounter(config);
    // return () => {
    //   stopCounter();
    // };
  }, [startStepCounter]);

  return (
    <View style={styles.centered}>
      <View style={styles.options}>
        {/* Render Steps  */}
        <View style={styles.stepView}>
          <Text style={{fontSize: 14, fontWeight: 'bold'}}>Steps</Text>
          <Text style={styles.valueStyle}>{steps}</Text>
        </View>

        {/* render Speedo meter */}

        <View style={styles.stepView}>
          <Text style={{fontSize: 14, fontWeight: 'bold'}}>Speed</Text>
          <Text style={styles.valueStyle}>{speed}</Text>
        </View>
      </View>

      <Pressable
        onPress={() => {
          if (startStepCounter) {
            setSteps(0);
            setStartStep(false);
            setSpeed(0);
          } else {
            setStartStep(true);
          }
        }}>
        <View style={styles.buttonnStyle}>
          <Text> {startStepCounter ? 'Reset' : 'Start Step Counter'} </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default StepCounter;
