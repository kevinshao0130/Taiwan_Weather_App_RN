import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, FlatList, Modal, TouchableWithoutFeedback } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from './styles';
import { getThirtySixDataActions, getEveryThreeHourDataActions } from '../../fetch/Action';
import { ActionTypes } from '../../constants/Actions';

const days = {
  '1': '週一',
  '2': '週二',
  '3': '週三',
  '4': '週四',
  '5': '週五',
  '6': '週六',
  '0': '週日',
};

const locations = [
  { key: 'taipei', value: '臺北市' },
  { key: 'newtaipei', value: '新北市' },
  { key: 'keelung', value: '基隆市' },
  { key: 'taoyuan', value: '桃園市' },
  { key: 'hsinchu1', value: '新竹縣' },
  { key: 'hsinchu2', value: '新竹市' },
  { key: 'miaoli', value: '苗栗縣' },
  { key: 'taichung', value: '臺中市' },
  { key: 'changhua', value: '彰化縣' },
  { key: 'nanyou', value: '南投縣' },
  { key: 'yunlin', value: '雲林縣' },
  { key: 'jiayi1', value: '嘉義縣' },
  { key: 'jiayi2', value: '嘉義市' },
  { key: 'tainan', value: '臺南市' },
  { key: 'kaohsiung', value: '高雄市' },
  { key: 'pingtung', value: '屏東縣' },
  { key: 'yilan', value: '宜蘭縣' },
  { key: 'hualian', value: '花蓮縣' },
  { key: 'taitung', value: '臺東縣' },
  { key: 'penghu', value: '澎湖縣' },
  { key: 'kinmen', value: '金門縣' },
  { key: 'lianjiang', value: '連江縣' },
];

class InitPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minT: '',
      maxT: '',
      AT: '',
      pop: '',
      wx: '',
      rh: '',
      wxImage: require('../../image/ic_cloud.png'),
      isLoading: false,
      hourList: [],
      location: locations[3].value,
      locModalVisible: false,
    };
    this.currentGreetingTime = moment(new Date()).format("HH") > 17 || moment(new Date()).format("HH") < 5 ? 0 : 1;
  }

  componentDidMount() {
    var url = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-D8B8B83D-A283-465C-97CD-AB69E9FE7A90&locationName=';
    url += this.state.location;
    this.props.getThirtySixDataActions(url);
  }

  componentDidUpdate(prevProps){
    const {state, isLoading} = this.props.Reducer;
    if ( prevProps.isLoading !== isLoading ) {
      if(state === ActionTypes.GET_THIRTY_SIX_DATA_ACTION_SUCCESS) {
        var url = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-089?Authorization=CWB-D8B8B83D-A283-465C-97CD-AB69E9FE7A90&locationName=';
        url += this.state.location;
        this.props.getEveryThreeHourDataActions(url);
      }
    }
  }

  static getDerivedStateFromProps(nextProps, prevState){
    const {state, isLoading, thirtySixData, threeHourData} = nextProps.Reducer;
    if(isLoading !== prevState.isLoading) {
      if(state === ActionTypes.GET_THIRTY_SIX_DATA_ACTION_SUCCESS) {
        if(thirtySixData && thirtySixData.length !== 0) {
          console.log(thirtySixData);
          var dataList = thirtySixData.records.location[0].weatherElement;
          var dataMap = {};
          dataList.forEach(function(item){
            dataMap[item.elementName] = item.time[0].parameter.parameterName;
            if(item.elementName === 'Wx') {
              wxValue = parseInt(item.time[0].parameter.parameterValue, 10);
            }
          });
        }
        return {
          minT: dataMap['MinT'],
          maxT: dataMap['MaxT'],
          pop: dataMap['PoP'],
          isLoading: isLoading
        };
      }
      if(state === ActionTypes.GET_EVERY_THREE_HOUR_DATA_ACTION_SUCCESS) {
        if(threeHourData && threeHourData.length !== 0) {
          console.log(threeHourData);
          var dataList = threeHourData.records.locations[0].location[0].weatherElement;
          var dataMap = [];
          dataList.forEach(function(item){
            if(item.elementName === 'T' || item.elementName === 'PoP6h' || item.elementName === 'AT' || item.elementName === 'RH') {
              dataMap[item.elementName] = item.time;
            }
            if(item.elementName === 'Wx') {
              dataMap[item.elementName] = item.time;
            }
          });
          var timeList = [];
          for (var i = 0; i < 22; i++) {
            if (moment(new Date()) < moment(dataMap['T'][i].dataTime)) {
              timeList.push({
                'time': dataMap['T'][i].dataTime,
                'T': dataMap['T'][i].elementValue[0].value,
                'wx': dataMap['Wx'][i].elementValue[1].value,
                'AT': dataMap['AT'][i].elementValue[0].value,
                'RH': dataMap['RH'][i].elementValue[0].value,
                'pop': dataMap['PoP6h'][parseInt(i/2)].elementValue[0].value,
                wxImg: null
              })
            }
          }
          timeList.forEach((item) => {
            if(item.wx === 1) {
              if(this.currentGreetingTime === 0) {
                item.wxImg = require('../../image/ic_moon.png');
              } else {
                item.wxImg = require('../../image/ic_sun.png');
              }
            } else if (item.wx === 2 || item.wx === 3) {
              if(this.currentGreetingTime === 0) {
                item.wxImg = require('../../image/ic_cloud_moon.png');
              } else {
                item.wxImg = require('../../image/ic_cloud_sun.png');
              }
            } else if (item.wx >= 4 && item.wx <= 7) {
              item.wxImg = require('../../image/ic_cloud.png');
            } else if (item.wx >= 24 && item.wx <= 28) {
              item.wxImg = require('../../image/ic_cloud_fog.png');
            } else if (item.wx >= 8 && item.wx <= 22) {
              item.wxImg = require('../../image/ic_cloud_rain.png');
            } else if (item.wx >= 29 && item.wx <= 39) {
              item.wxImg = require('../../image/ic_cloud_rain.png');
            } else if (item.wx === 41) {
              item.wxImg = require('../../image/ic_cloud_rain.png');
            } 
            else {
              item.wxImg = require('../../image/ic_cloud.png');
            }
          });
          return {
            AT: dataMap['AT'][0].elementValue[0].value,
            rh: dataMap['RH'][0].elementValue[0].value,
            wx: dataMap['Wx'][0].elementValue[0].value,
            wxImage: timeList[0].wxImg,
            hourList: timeList,
            isLoading: isLoading
          };
        }
      } else {
        return {
          isLoading: isLoading
        };
      }
    } else {
      return {
        isLoading: false
      };
    }
  }

  setLocation(loc) {
    this.setState({ location: loc });
    this.setState({ locModalVisible: false });
    var url = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-D8B8B83D-A283-465C-97CD-AB69E9FE7A90&locationName=';
    url += loc;
    this.props.getThirtySixDataActions(url);
  }

  setLocModalVisible(visible) {
    this.setState({ locModalVisible: visible });
  }

  _renderHourData = (item) => {
    if (item.index < 11) {
      return (
        <View style={styles.hourView1}>
          <View style={styles.hourView2}>
            <Text style={styles.hourTxt1}>{moment(item.item.time).format('HH')}時 {days[moment(item.item.time).day()]}</Text>
          </View>
          <View style={styles.cardView2}>
            <View style={styles.hourView3}>
              <Image
                style={styles.hourImg3}
                source={item.item.wxImg}
              />
              <Text style={[styles.raindropTxt1, {marginLeft: 10}]}>{item.item.pop}%</Text>
            </View>
            <View style={styles.lineView2} />
            <View style={styles.hourView5}>
              <View style={styles.hourView4}>
                <Text style={styles.hourTxt2}>{item.item.T}°c</Text>
              </View>
            </View>
          </View>
        </View>
      );
    }
  }

  _renderLocationList = (item) => {
    return (
      <TouchableOpacity
        style={styles.locModalView3}
        onPress={() => { this.setLocation(item.item.value); }}
      >
        <Text style={styles.locModalTxt1}>{item.item.value}</Text>
      </TouchableOpacity>
    );
  }

  _hourKeyExtractor = (item) => item.time;

  _locKeyExtractor = (item) => item.key;

  render() {
    const { AT, minT, maxT, pop, wx, rh, wxImage, hourList, location, locModalVisible, isLoading } = this.state;
    return (
      <View style={styles.container}>
        <Spinner visible={isLoading}/>
        <Modal
          animationType="slide"
          transparent={true}
          visible={locModalVisible}
          onRequestClose={() => { this.setLocModalVisible(false); }}
        >
          <TouchableWithoutFeedback onPress={() => { this.setLocModalVisible(false); }}>
            <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}} />
          </TouchableWithoutFeedback>
          <View style={styles.locModalView1}>
            <View style={styles.locModalView2}>
            <FlatList
              data={locations}
              extraData={this.state}
              keyExtractor={this._locKeyExtractor}
              renderItem={this._renderLocationList}
            />
            </View>
          </View>
        </Modal>
        <View style={styles.navBarView1}>
          <TouchableOpacity
            style={styles.navBarView2}
            onPress={() => { this.setLocModalVisible(true); }}
          >
            <Image
              style={styles.imgLocation}
              source={require('../../image/ic_location.png')}
            />
            <Text style={styles.txt2}>{location}</Text>
            <Image
              style={styles.imgTriangleDown}
              source={require('../../image/ic_triangle_down.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.lineView3}/>
        <View style={styles.cardView1}>
          <View style={styles.topView}>
            <View style={styles.topLeftView}>
              <View style={styles.imgView}>
                <Image
                  style={styles.mainImg}
                  source={wxImage}
                />
              </View>
              <View style={styles.txtView1}>
                <Text style={styles.txt1}>{wx}</Text>
                <View style={styles.umbrellaView1}>
                  <Image
                    style={styles.imgUmbrella}
                    source={require('../../image/ic_umbrella.png')}
                  />
                  <Text style={styles.raindropTxt1}>{pop}%</Text>
                </View>
              </View>
            </View>
            <View style={styles.lineView1} />
              <View style={styles.topRightView}>
                <Text style={styles.txt4}>體感溫度</Text>
                <View style={styles.align_items_center}>
                  <Text style={styles.txt5}>{AT}°c</Text>
                  <View style={styles.txtView2}>
                    <Text style={styles.txt6}>{minT}°c~{maxT}°c</Text>
                  </View>
                  <View style={styles.raindropView1}>
                    <Image
                      style={styles.imgRainDrop}
                      source={require('../../image/ic_raindrop.png')}
                    />
                    <Text style={styles.raindropTxt1}>{rh}%</Text>
                  </View>
                </View>
              </View>
          </View>
        </View>
        <View style={styles.lineView3}/>
        <FlatList
          data={hourList}
          extraData={this.state}
          keyExtractor={this._hourKeyExtractor}
          renderItem={this._renderHourData}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    Reducer: state.Reducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
      ...bindActionCreators({ getThirtySixDataActions, getEveryThreeHourDataActions }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InitPage)
// this.props.navigation.navigate('TestPage')