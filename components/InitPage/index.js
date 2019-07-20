import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, FlatList, Modal, TouchableWithoutFeedback, NetInfo, ToastAndroid, Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from './styles';
import { getThirtySixDataActions, getEveryThreeHourDataActions, getOneWeekDataActions } from '../../fetch/Action';
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
      isConnected: false,
      dataState: 1,
      weekList: []
    };
    this.currentGreetingTime = moment(new Date()).format("HH") > 17 || moment(new Date()).format("HH") < 5 ? 0 : 1;
    this.setDataState.bind(this);
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleConnectivityChange.bind(this)
    );
    NetInfo.isConnected.fetch().done(
        (isConnected) => {
          this.setState({ isConnected });
          this.setState({ isLoading: false });
          if(isConnected) {
            var url = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-D8B8B83D-A283-465C-97CD-AB69E9FE7A90&locationName=';
            url += this.state.location;
            if(this.state.isConnected) {
              this.props.getThirtySixDataActions(url);
            }
          }
        }
    );
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
        'connectionChange',
        this._handleConnectivityChange.bind(this)
    );
  }

  _handleConnectivityChange(isConnected) {
    this.setState({ isConnected });
    this.setState({ isLoading: false });
    if(!isConnected) {
      ToastAndroid.show(('請檢查網路連線'),ToastAndroid.LONG);
    }
  }

  componentDidUpdate(prevProps){
    const {state, isLoading} = this.props.Reducer;
    if ( prevProps.isLoading !== isLoading ) {
      if(state === ActionTypes.GET_THIRTY_SIX_DATA_ACTION_SUCCESS) {
        var url = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-089?Authorization=CWB-D8B8B83D-A283-465C-97CD-AB69E9FE7A90&locationName=';
        url += this.state.location;
        this.props.getEveryThreeHourDataActions(url);
      }
      if(state === ActionTypes.GET_EVERY_THREE_HOUR_DATA_ACTION_SUCCESS) {
        var url = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-D8B8B83D-A283-465C-97CD-AB69E9FE7A90';
        url += '&elementName=MinT,MaxT,Wx&locationName='
        url += this.state.location;
        this.props.getOneWeekDataActions(url);
      }
    }
  }

  static getDerivedStateFromProps(nextProps, prevState){
    const {state, isLoading, thirtySixData, threeHourData, oneWeekData} = nextProps.Reducer;
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
      if(state === ActionTypes.GET_ONE_WEEK_DATA_ACTION_SUCCESS) {
        if(oneWeekData && oneWeekData.length !== 0) {
          console.log(oneWeekData);
          var dataList = oneWeekData.records.locations[0].location[0].weatherElement;
          var dataMap = {};
          dataList.forEach(function(item){
            dataMap[item.elementName] = item.time;
          });
          var timeList = [];
          for (var i = 0; i < dataMap['MaxT'].length; i++) {
            if(moment(dataMap['MaxT'][i].startTime).format('DD') === moment(dataMap['MaxT'][i].endTime).format('DD')) {
              timeList.push({
                'index': i.toString(),
                'date': moment(dataMap['MaxT'][i].startTime),
                'wx': dataMap['Wx'][i].elementValue[1].value,
                'minT': dataMap['MinT'][i].elementValue[0].value,
                'maxT': dataMap['MaxT'][i].elementValue[0].value,
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
            weekList: timeList,
            isLoading: isLoading
          };
        }
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
      if(state === ActionTypes.GET_THIRTY_SIX_DATA_ACTION_FAILURE || state === ActionTypes.GET_EVERY_THREE_HOUR_DATA_ACTION_FAILURE) {
        return {
          isLoading: false
        };
      }
    } else {
      return {
        isLoading: false
      };
    }
  }

  setDataState(data) {
    this.setState({ dataState: data });
    this.refs.listRef.scrollToOffset({x: 0, y: 0, animated: true})
    this.refs.listRef.scrollToOffset({x: 0, y: 0, animated: true})
  }

  setLocation(loc) {
    this.setState({ location: loc });
    this.setState({ locModalVisible: false });
    this.refs.listRef.scrollToOffset({x: 0, y: 0, animated: true})
    var url = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-D8B8B83D-A283-465C-97CD-AB69E9FE7A90&locationName=';
    url += loc;
    if(this.state.isConnected) {
      this.props.getThirtySixDataActions(url);
    }
  }

  refreshPage() {
    this.refs.listRef.scrollToOffset({x: 0, y: 0, animated: true})
    var url = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-D8B8B83D-A283-465C-97CD-AB69E9FE7A90&locationName=';
    url += this.state.location;
    if(this.state.isConnected) {
      this.props.getThirtySixDataActions(url);
    }
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
              <View style={styles.topView1}>
                <Image
                  style={styles.hourImg3}
                  source={item.item.wxImg}
                />
              </View>
              <View style={styles.topView1}>
                <Text style={styles.txt6}>{item.item.pop}%</Text>
              </View>
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

  _renderWeekData = (item) => {
    return (
      <View style={styles.hourView1}>
        <View style={[styles.hourView2, { flex: 1 }]}>
          <Text style={styles.hourTxt1}>{days[moment(item.item.date).day()]}</Text>
        </View>
        <View style={styles.cardView2}>
          <View style={[styles.hourView3, { flex: 3 }]}>
            <Image
              style={styles.hourImg3}
              source={item.item.wxImg}
            />
          </View>
          <View style={styles.lineView2} />
          <View style={[styles.hourView5, { flex: 5 }]}>
            <View style={styles.hourView4}>
              <Text style={styles.hourTxt2}>{item.item.minT}°c~{item.item.maxT}°c</Text>
            </View>
          </View>
        </View>
      </View>
    );
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

  _weekKeyExtractor = (item) => item.index;

  _locKeyExtractor = (item) => item.key;

  render() {
    const { AT, minT, maxT, pop, wx, rh, wxImage, hourList, location, locModalVisible, isLoading, dataState, weekList } = this.state;
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
            <View style={styles.modalOutside} />
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
          <View style={styles.topView}>
            <View style={styles.topView}/>
            <View style={styles.topView1}>
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
            <View style={styles.topView2}>
              <TouchableOpacity onPress={() => { this.refreshPage(); }}>
                <Image
                  style={styles.refreshImg}
                  source={require('../../image/ic_refresh.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
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
        { dataState === 1 ?
          <FlatList
            ref="listRef"
            data={hourList}
            extraData={this.state}
            keyExtractor={this._hourKeyExtractor}
            renderItem={this._renderHourData}
          />
          :
          <FlatList
            ref="listRef"
            data={weekList}
            extraData={this.state}
            keyExtractor={this._weekKeyExtractor}
            renderItem={this._renderWeekData}
          />
        }
        <View style={styles.lineView3}/>
        <View style={styles.bottomView1}>
          <TouchableOpacity
            style={[styles.bottomView2, { borderBottomColor: dataState === 1 ? '#FFF' : '#04706b' }]}
            onPress={() => { this.setDataState(1); }}
          >
            <Text style={styles.bottomTxt}>每3小時</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.bottomView2, { borderBottomColor: dataState === 2 ? '#FFF' : '#04706b' }]}
            onPress={() => { this.setDataState(2); }}
          >
            <Text style={styles.bottomTxt}>每週</Text>
          </TouchableOpacity>
        </View>
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
      ...bindActionCreators({ getThirtySixDataActions, getEveryThreeHourDataActions, getOneWeekDataActions }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InitPage)