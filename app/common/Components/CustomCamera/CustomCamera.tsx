import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Platform,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import ImageCropPicker from 'react-native-image-crop-picker';
import Colors from '../../../libs/Colors';
interface CameraProps {
  textString: string;
  onModalCancel: any;
  PendingView: any;
  onRecordDone: any;
  onCroppingDone: any;
  isVideo: boolean;
  cropperRotateButtonsHidden: any;
  hideBottomControls: any;
  freeStyleCropEnabled: boolean;
  isVideoPresent: boolean;
  onRecordingStart: any;
}

const CustomCamera = ({
  onModalCancel,
  PendingView,
  onRecordDone,
  onCroppingDone,
  isVideo,
  cropperRotateButtonsHidden,
  hideBottomControls,
  freeStyleCropEnabled,
  isVideoPresent,
  onRecordingStart,
}: CameraProps) => {
  const [timerCount, setTimer] = useState(10);
  const [showText, setShowText] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [recordData, setRecordData] = useState(null);
  const [imagePreview, setImagePreview] = useState<boolean>(false);
  const [captureURI, setCaptureURI] = useState<any>();
  const [rotate, setRotate] = useState<boolean>(true);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const displayTimer = () => {
    console.log('LOG:: OKAY TOMiR');
    let interval = setInterval(() => {
      setTimer(lastTimerCount => {
        lastTimerCount <= 1 && clearInterval(interval);
        return lastTimerCount - 1;
      });
    }, 1000); //each count lasts for a second

    return () => {
      clearInterval(interval);
    };
  };

  // Blinking Animation
  const blinkingText = () => {
    let interval22 = setInterval(() => {
      timerCount == 0 && clearInterval(interval22);
      setShowText(showText => !showText);
    }, 500); //each count lasts for a half second
    return () => clearInterval(interval22);
  };

  // Rendering of CameraView

  const renderCameraView = () => {
    return (
      <RNCamera
        style={{width: windowWidth, height: windowHeight}}
        type={
          !rotate ? RNCamera.Constants.Type.back : RNCamera.Constants.Type.front
        }
        captureAudio={true}
        defaultVideoQuality={RNCamera.Constants.VideoQuality['480p']}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onRecordingStart={onRecordingStart}>
        {({camera, status, recordAudioPermissionStatus}) => {
          return (
            <View style={styles.cameraViewStyle}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: Platform.OS == 'ios' ? 30 : 0,
                }}>
                {isVideo && (
                  <View
                    style={{
                      alignSelf: 'flex-start',
                      marginTop: 30,
                      marginLeft: 30,
                    }}>
                    <TouchableOpacity onPress={() => onModalCancel()}>
                      <Text style={{fontSize: 16, color: Colors.whiteColor}}>
                        {' '}
                        {showTimer && '00:' + timerCount}{' '}
                        {showText && (
                          <Text style={{color: 'red', fontWeight: 'bold'}}>
                            {' '}
                            Recording
                          </Text>
                        )}{' '}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}

                <View
                  style={{
                    alignSelf: 'flex-end',
                    marginTop: 30,
                    marginRight: 30,
                  }}>
                  <TouchableOpacity onPress={() => onModalCancel()}>
                    <Text style={{fontSize: 16, color: Colors.whiteColor}}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Bottom Button for capture Image */}
              <View
                style={{
                  // alignSelf: 'center',
                  justifyContent: 'center',
                  marginBottom: 30,
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  onLongPress={async () => {
                    console.log('LOGG: PRESS IN ' + isVideoPresent);
                    if (isVideo) {
                      // If Video type
                      setShowTimer(true);
                      displayTimer();
                      blinkingText();
                      console.log('LOG:: OKAY TIMER ' + timerCount);
                      try {
                        const options = {
                          maxFileSize: 60 * 1024 * 1024,
                          maxDuration: 10,
                        };
                        const data = await camera.recordAsync(options);
                        onRecordDone(data);
                      } catch (c) {
                        console.log(
                          'LOGG:: OKAY audioStatus Error ' + JSON.stringify(c),
                        );
                      }
                    }
                    //} // end else part....
                  }}
                  onPress={async () => {
                    const options = {quality: 0.5, base64: true};
                    const data = await camera.takePictureAsync(options);
                    // console.log('LOG:: OKAY DATA URI ' + JSON.stringify(data));
                    console.log('LOG:: OJAY NNN ' + JSON.stringify(data));

                    setTimeout(() => {
                      // write your functions
                      setImagePreview(true);
                      const base64 = data.base64;
                      // setCaptureURI(base64);
                      setCaptureURI(data?.uri);
                    }, 500);
                  }}
                  onPressOut={async () => {
                    const options = {quality: 0.5, base64: true};
                    console.log('LOG:: OKAY TIMER OUT PRESS ' + timerCount);
                    try {
                      const data11 = await camera.stopRecording();
                    } catch (c) {
                      console.log(
                        'LOGG:: OKAY audioStatus Error1111 ' +
                          JSON.stringify(c),
                      );
                    }
                  }}>
                  <Image
                    source={require('../../../../assets/images/cameraIcon/cameraIcon.png')}
                    style={{width: 70, height: 70}}
                  />
                </TouchableOpacity>

                <View
                  style={{
                    alignSelf: 'flex-end',
                    position: 'absolute',
                    bottom: 20,
                    right: 20,
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setRotate(!rotate);
                    }}>
                    <Image
                      source={require('../../../../assets/images/ic_rotate_camera.png')}
                      style={{width: 30, height: 30}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      </RNCamera>
    );
  };

  // rendering of Image PreView
  const renderImagePreview = () => {
    return (
      <View
        style={[
          // styles.imagePreviewStyle,
          {
            width: windowWidth,
            height: windowHeight,
            // marginRight: -50,
            backgroundColor: Colors.black,
            // marginLeft: 5,
            // borderWidth: 10,
            // borderColor: Colors.whiteColor,
          },
        ]}>
        <Image
          source={{uri: captureURI}}
          style={{width: '100%', height: '80%', marginBottom: 30}}
          resizeMode={'contain'}
        />
        {/* render Bottom Options Retake or Use Photo */}
        <View style={styles.optionStyle}>
          {/* Retake Option */}
          <TouchableOpacity
            onPress={() => {
              setImagePreview(!imagePreview);
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../../../../assets/images/retake_icon/retake_icon.png')}
                style={styles.imageStyle}
                resizeMode={'contain'}
              />
              <Text style={styles.textStyleOption}>Retake</Text>
            </View>
          </TouchableOpacity>

          {/* Use Photo Option */}
          <TouchableOpacity
            onPress={() => {
              // onCroppingDone(captureURI);
              // onModalCancel();
              // onCroppingDone(data);
              console.log('LOG:: OKAY N N ' + captureURI);

              ImageCropPicker.openCropper({
                path: captureURI,
                width: 300,
                height: 400,
                includeBase64: true,
                freeStyleCropEnabled: true,
                avoidEmptySpaceAroundImage: false,
              }).then(image => {
                // const data = base64Prefix + image?.data;
                const data = image?.data;

                onCroppingDone(data, captureURI);
                onModalCancel();
                console.log(data);
              });
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../../../../assets/images/ic_done/ic_done.png')}
                style={styles.imageStyle}
                resizeMode={'contain'}
              />
              <Text style={styles.textStyleOption}>Use photo</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View>{imagePreview ? renderImagePreview() : renderCameraView()}</View>
  );
};
const styles = StyleSheet.create({
  cameraViewStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  textStyle: {
    fontWeight: 'bold',
    color: Colors.black,
  },
  imagePreviewStyle: {
    backgroundColor: Colors.black,
  },
  optionStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  imageStyle: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
  },
  textStyleOption: {
    color: Colors.whiteColor,
  },
});

export default CustomCamera;
