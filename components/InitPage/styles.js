import { StyleSheet, Dimensions } from 'react-native'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#04706b'
    // backgroundColor: '#000',
  },
  locView1: {
    height: 35
  },
  navBarView1: {
    height: 56
  },
  navBarView2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  topView: {
    flex: 1,
    flexDirection: 'row'
  },
  topView1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  topView2: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  topLeftView: {
    flex: 1,
    alignItems: 'center'
  },
  topRightView: {
    flex: 1,
    marginTop: 16
  },
  imgView: {
    flex: 1,
    marginTop: 25
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
    marginTop: 5,
    height: 100,
    justifyContent: 'center'
  },
  txtView2: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#FFF',
    height: 37,
    paddingHorizontal: 10,
    marginTop: 5
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
  txt7: {
    fontSize: 20,
    color: '#FFF'
  },
  cardView1: {
    marginHorizontal: 15,
    marginBottom: 17,
    borderRadius: 10,
    backgroundColor: '#38ada9',
    // backgroundColor: '#2e2e2e',
    height: 220
  },
  cardView2: {
    flex: 3,
    marginRight: 15,
    borderRadius: 10,
    backgroundColor: '#38ada9',
    // backgroundColor: '#2e2e2e',
    height: 50,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  mainImg: {
    height: 90,
    width: 90
  },
  refreshImg: {
    width: 25,
    height: 25,
    marginRight: 20
  },
  lineView1: {
    backgroundColor: '#FFF',
    width: 2,
    marginVertical: 18
  },
  lineView2: {
    height: 36,
    backgroundColor: '#FFF',
    width: 2,
    marginLeft: 5
  },
  lineView3: {
    height: 1,
    backgroundColor: '#FFF',
    marginHorizontal: 12
  },
  align_items_center: {
    alignItems: 'center'
  },
  umbrellaView1: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 15
  },
  raindropView1: {
    flexDirection: 'row',
    marginTop: 7
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
    flexDirection: 'row',
    height: 67
  },
  hourView2: {
    flex: 1.5,
    backgroundColor: '#FFF',
    height: 48,
    marginVertical: 11.5,
    borderRadius: 10,
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  hourView3: {
    flex: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  hourView4: {
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
    // color: '#000',
    fontSize: 20
  },
  hourTxt2: {
    fontSize: 28,
    color: '#FFF',
    marginBottom: 2
  },
  modalOutside: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  locModalView1: {
    flex: 1,
    alignItems: 'center'
  },
  locModalView2: {
    width: screenWidth - 30,
    height: screenHeight - 370,
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 5,
    borderRadius: 15,
    borderColor: '#000',
    borderWidth: 1,
    position: 'absolute',
    bottom: 0
  },
  locModalView3: {
    flex: 1,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000',
    borderBottomWidth: 1,
    marginHorizontal: 5
  },
  locModalTxt1: {
    fontSize: 25,
    color: '#000'
  },
  bottomView1: {
    height: 45,
    flexDirection: 'row'
  },
  bottomView2: {
    flex: 1
  },
  bottomView3: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    marginHorizontal: 15,
    borderRadius: 7
  },
  bottomTxt: {
    fontSize: 20,
    color: '#d1d1d1'
  },
  timeView: {
    marginVertical: 2,
    alignItems: 'flex-end',
    marginRight: 20
  },
  timeTxt: {
    fontSize: 13,
    color: '#FFF'
  },
  networkModalView1: {
    width: 170,
    height: 60,
    backgroundColor: 'rgba(88, 88, 88, 0.9)',
    borderRadius: 30
  },
  errorModalView1: {
    width: 250,
    height: 150,
    backgroundColor: 'rgba(88, 88, 88, 0.9)',
    borderRadius: 30
  },
  errorModalView2: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
