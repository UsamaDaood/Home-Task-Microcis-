import { StyleSheet } from "react-native";
import Colors from "../libs/Colors";

export const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.whiteColor,
  },
  options:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  stepView:{
    flexDirection: 'column',
    borderWidth: 1,
    alignItems: 'center',
    width: '30%',
    borderRadius: 10,
    padding: 10
  },
  valueStyle:{
    fontSize: 36,
    marginTop: 20,
    alignSelf: 'center',
    color: Colors.black,
    fontWeight: 'bold',
  },
  buttonnStyle:{
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 30,
  }
});