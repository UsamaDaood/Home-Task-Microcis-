import React, {useRef, useState} from 'react';
import {Text, View, Pressable, Modal} from 'react-native';
//** Components */
import CustomCamera from '../../common/Components/CustomCamera/CustomCamera';
import ImagePicker from 'react-native-image-crop-picker';
//** Utils */
import Colors from '../../libs/Colors';
import Video, {VideoRef} from 'react-native-video';
//** Styles */
import {styles} from '../../Styles/HomeStyles';

interface HomeProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeProps> = ({navigation}) => {
  const [isCameraDisplay, setIsCameraDisplay] = useState<boolean>(false);
  const videoRef = useRef<VideoRef>(null);
  const [videoURI, setVideoURI] = useState<string>('');

  // render Custom Camera
  const renderCustomCameraModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isCameraDisplay}
        style={{
          margin: -15,
          padding: 15,
        }}
        onRequestClose={() => {
          setIsCameraDisplay(!isCameraDisplay);
        }}>
        <View style={{flex: 1, backgroundColor: Colors.black}}>
          <CustomCamera
            PendingView={<Text>Loading</Text>}
            onModalCancel={() => setIsCameraDisplay(!isCameraDisplay)}
            isVideo={true}
            onRecordDone={(data: any) => {
              console.log('RECORD DATA: ', data?.uri);
              setVideoURI(data?.uri);
              setIsCameraDisplay(!isCameraDisplay);
            }}
            onCroppingDone={onCroppingDone}
            cropperRotateButtonsHidden={true}
            hideBottomControls={true}
            freeStyleCropEnabled={true}
          />
        </View>
      </Modal>
    );
  };

  // On Final Image
  const onCroppingDone = (data: any, captureURI: string) => {
    console.log('LOGG:: DATA ' + JSON.stringify(data));
    console.log('LOG:: OKAY URI press ==> captureURI ' + captureURI);
  };

  // render Video
  const renderViewView = () => {
    return (
      <View style={styles.renderVideoView}>
        <Video
          repeat={true}
          // Can be a URL or a local file.
          source={{uri: videoURI}}
          // Store reference
          ref={videoRef}
          style={{
            top: 0,
            position: 'absolute',
            left: 60,
            bottom: 0,
            right: 0,
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.buttonView}>
        <Pressable
          onPress={() => {
            // open camera modal
            console.log('Open camera');
            setIsCameraDisplay(true);
          }}>
          <View style={styles.buttonStyle}>
            <Text style={styles.buttonFonntStyle}>Open Camera to Record</Text>
          </View>
        </Pressable>

        {/* Ope Stepomenter */}

        <Pressable
          onPress={() => {
            // open camera modal
            navigation.navigate('StepCounter');
          }}>
          <View style={styles.buttonStyle}>
            <Text style={styles.buttonFonntStyle}>Open Step counter</Text>
          </View>
        </Pressable>
      </View>

      <View style={styles.infoView}>
        <View style={styles.infoTitleView}>
          <Text style={styles.infoTextStyle}>Info</Text>
        </View>

        <Text style={{textAlign: 'center', padding: 10}}>
          Please Note That to record the video please hold the button to record
          Video when camera open.
        </Text>
      </View>

      {videoURI.trim().length > 0 && renderViewView()}

      {/* Reder camera Modal */}
      {renderCustomCameraModal()}
    </View>
  );
};

export default HomeScreen;
