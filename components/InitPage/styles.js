import {StyleSheet, Dimensions} from 'react-native';

module.exports = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
    },
    locView1: {
      height: 30,
      backgroundColor: '#FFF',
    },
    topView: {
      flex: 1,
      flexDirection: 'row',
    },
    topLeftView: {
      flex: 4,
      height: 250,
      alignItems: 'center',
    },
    imaView: {
      flex: 1,
      marginTop: 50
    },
    imaloc: {
      marginLeft: 15,
      height: 22,
      width: 22,
      marginTop: 3
    },
    imaclock: {
      marginRight: 5,
      marginTop: 3,
      height: 24,
      width: 25 
    },
    topRightView: {
      flex: 3,
      height: 250,
      backgroundColor: 'red',
    },
    locTxtView: {
      marginLeft: 5,
      justifyContent: 'center'
    },
    clockTxtView1: {
      flex: 1,
      alignItems: 'flex-end',
      width: 11,
      marginRight: 15 
    },
    clockTxtView2: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    txtView1: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    txt1: {
      fontSize: 20,
      color: '#000'
    },
    txt2: {
      fontSize: 15,
      color: '#000'
    }
  });