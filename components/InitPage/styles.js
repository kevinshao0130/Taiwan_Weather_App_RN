import {StyleSheet, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#04706b',
    },
    locView1: {
      height: 35,
    },
    navBarView1: {
      height: 56
    },
    navBarView2: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    topView: {
      flex: 1,
      flexDirection: 'row',
    },
    topLeftView: {
      flex: 1,
      alignItems: 'center',
    },
    topRightView: {
      flex: 1,
      marginTop: 20,
    },
    imgView: {
      flex: 1,
      marginTop: 25,
    },
    imgLocation: {
      height: 22,
      width: 17,
      marginTop: 2,
      marginRight: 10
    },
    imgTriangleDown: {
      width: 20,
      height: 14,
      marginLeft: 10
    },
    imgUmbrella: {
      height: 25,
      width: 25,
      marginBottom: 3
    },
    imgRainDrop: {
      height: 24,
      width: 20,
      marginTop: 5 
    },
    clockTxtView1: {
      flex: 1,
      alignItems: 'flex-end',
      marginRight: 18 
    },
    clockTxtView2: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    txtView1: {
      flex: 1,
      alignItems: 'center',
      marginTop: 20,
      height: 150
    },
    txtView2: {
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#FFF',
      height: 37,
      paddingHorizontal: 10,
      marginTop: 18
    },
    txt1: {
      fontSize: 20,
      textAlign: 'center',
      marginHorizontal: 10,
      color: '#FFF'
    },
    txt2: {
      fontSize: 22,
      color: '#FFF'
    },
    txt3: {
      fontSize: 15,
      color: '#FFF',
      marginTop: 2
    },
    txt4: {
      fontSize: 15,
      color: '#FFF',
      marginLeft: 25
    },
    txt5: {
      fontSize: 65,
      color: '#FFF'
    },
    txt6: {
      fontSize: 25,
      color: '#FFF'
    },
    cardView1: {
      marginHorizontal: 15,
      marginVertical: 20,
      borderRadius: 10,
      backgroundColor: '#38ada9',
      height: 245 
    },
    cardView2: {
      flex: 3,
      marginRight: 15,
      borderRadius: 10,
      backgroundColor: '#38ada9',
      height: 60,
      marginVertical:10,
      flexDirection: 'row',
      alignItems: 'center'
    },
    mainImg: {
      height: 90,
      width: 90
    },
    lineView1: {
      backgroundColor: '#FFF',
      width: 2,
      marginVertical: 18
    },
    lineView2: {
      height: 45,
      backgroundColor: '#FFF',
      width: 2
    },
    lineView3: {
      height: 2,
      backgroundColor:'#FFF'
    },
    align_items_center: {
      alignItems: 'center'
    },
    umbrellaView1: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-end',
      marginBottom: 16 
    },
    raindropView1: {
      flexDirection: 'row',
      marginTop: 14
    },
    umbrellaTxt1: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-end',
      marginBottom: 16 
    },
    raindropTxt1: {
      fontSize: 25,
      color: '#FFF',
      marginLeft: 7
    },
    hourView1: {
      flexDirection:'row',
      height: 80
    },
    hourView2: {
      flex: 1.5,
      backgroundColor: '#FFF',
      height: 58,
      marginVertical: 11,
      borderRadius: 10,
      marginHorizontal: 15,
      justifyContent:'center',
      alignItems: 'center'
    },
    hourView3: {
      flex: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    hourView4: {
      borderWidth: 2,
      borderRadius: 10,
      borderColor: '#FFF',
      paddingHorizontal: 10
    },
    hourView5: {
      flex: 4,
      alignItems: 'center'
    },
    hourImg3: {
      width: 40,
      height: 40
    },
    hourTxt1: {
      color: '#04706b',
      fontSize: 23
    },
    hourTxt2: {
      fontSize: 28,
      color: '#FFF'
    },
    locModalView1: {
      flex: 1,
      alignItems: 'center',
      marginTop: 345
    },
    locModalView2: {
      width: screenWidth - 30,
      height: screenHeight - 370,
      backgroundColor: '#FFF',
      paddingHorizontal: 15,
      borderRadius: 15
    },
    locModalView3: {
      flex: 1,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#000',
      borderBottomWidth: 1, 
    },
    locModalTxt1: {
      fontSize: 25,
      color: '#000'
    },
  });