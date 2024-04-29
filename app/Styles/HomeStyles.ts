import { StyleSheet } from "react-native";
import Colors from "../libs/Colors";

export const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    backgroundColor: Colors.backGroundLowWhiteColor,
    flex: 100,
  },
  renderVideoView:{
    width: 290,
    height: 300,
    marginTop: 30,
    borderRadius: 10
  },
  buttonView:{
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-around',
  },
  buttonStyle:{
    borderRadius: 10,
    backgroundColor: Colors.primaryColor,
    padding: 10,
  },
  buttonFonntStyle:{
    color: Colors.whiteColor
  },
  infoView:{
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    margin: 10,
    borderColor: Colors.primaryColor,
  },
  infoTitleView:{
     padding: 6,
     backgroundColor: Colors.primaryColor,
     borderTopLeftRadius: 10,
     borderTopRightRadius: 10,
  },
  infoTextStyle:{
    alignSelf: 'center',
    color: Colors.whiteColor,
    fontSize: 18,
  }

});