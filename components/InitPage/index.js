import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import styles from './styles';
import { getThirtySixDataActions, getEveryThreeHourDataActions } from '../../fetch/Action';
import { ActionTypes } from '../../constants/Actions';

const days = {
  '1': 'MON',
  '2': 'TUE',
  '3': 'WED',
  '4': 'THU',
  '5': 'FRI',
  '6': 'SAT',
  '7': 'SUN',
};

const testData = [
  {
    time: '2019-03-29 12:00:00',
    img: require('../../image/ic_sun.png'),
    tem: 30,
    pop: 0,
  },
  {
    time: '2019-03-29 15:00:00',
    img: require('../../image/ic_cloud.png'),
    tem: 22,
    pop: 20,
  },
  {
    time: '2019-03-29 18:00:00',
    img: require('../../image/ic_cloud_rain.png'),
    tem: 25,
    pop: 100,
  },
  {
    time: '2019-03-29 21:00:00',
    img: require('../../image/ic_cloud_rain.png'),
    tem: 25,
    pop: 100,
  },
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
      currentDate: moment(new Date()).format("YYYY/MM/DD"),
      currentDay: days[new Date().getDay()],
      isLoading: false,
    };
    this.currentGreetingTime = moment(new Date()).format("HH") > 17 || moment(new Date()).format("HH") < 5 ? 0 : 1;
  }

  componentDidMount() {
    //var date1 = moment(new Date()).format("YYYY-MM-DDTHH:mm:ss");
    //var date2 = moment(new Date()).add(1, 'day').format("YYYY-MM-DDTHH:mm:ss");
    var url = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-D8B8B83D-A283-465C-97CD-AB69E9FE7A90&locationName=桃園市';
    this.props.getThirtySixDataActions(url);
  }

  componentDidUpdate(prevProps){
    if ( prevProps.isLoading !== this.props.Reducer.isLoading ) {
      if(this.props.Reducer.state === ActionTypes.GET_THIRTY_SIX_DATA_ACTION_SUCCESS) {
        var url = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-089?locationName=桃園市&Authorization=CWB-D8B8B83D-A283-465C-97CD-AB69E9FE7A90';
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
          var wxValue = '';
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
          var wxValue = '';
          var dataMap = {};
          dataList.forEach(function(item){
            dataMap[item.elementName] = item.time[0].elementValue[0].value;
            if(item.elementName === 'Wx') {
              wxValue = parseInt(item.time[0].elementValue[1].value, 10);
            }
          });
          if(wxValue === 1) {
            if(this.currentGreetingTime === 0) {
              wxImg = require('../../image/ic_moon.png');
            } else {
              wxImg = require('../../image/ic_sun.png');
            }
          } else if (wxValue === 2 || wxValue === 3) {
            if(this.currentGreetingTime === 0) {
              wxImg = require('../../image/ic_cloud_moon.png');
            } else {
              wxImg = require('../../image/ic_cloud_sun.png');
            }
          } else if (wxValue >= 4 && wxValue <= 7) {
            wxImg = require('../../image/ic_cloud.png');
          } else if (wxValue >= 24 && wxValue <= 28) {
            wxImg = require('../../image/ic_cloud_fog.png');
          } else if (wxValue >= 8 && wxValue <= 22) {
            wxImg = require('../../image/ic_cloud_rain.png');
          } else if (wxValue >= 29 && wxValue <= 39) {
            wxImg = require('../../image/ic_cloud_rain.png');
          } else if (wxValue === 41) {
            wxImg = require('../../image/ic_cloud_rain.png');
          } 
          else {
            wxImg = require('../../image/ic_cloud.png');
          }
          return {
            AT: dataMap['AT'],
            rh: dataMap['RH'],
            wx: dataMap['Wx'],
            wxImage: wxImg,
            isLoading: isLoading
          };
        }
      } else {
        return {
          thirtySixData: '',
          isLoading: isLoading
        };
      }
    } else {
      return {
        thirtySixData: '',
        isLoading: false
      };
    }
  }

  renderHourData(data) {
    let hourData = [];
    data.forEach((item, index) => {
      hourData.push(
        <View style={styles.hourView1} key={index}>
            <View style={styles.hourView2}>
              <Text style={styles.hourTxt1}>{moment(item.time).format('HH:mm')}</Text>
            </View>
            <View style={styles.cardView2}>
              <View style={styles.hourView3}>
                <Image
                  style={styles.hourImg3}
                  source={item.img}
                />
                <Text style={[styles.raindropTxt1, {marginLeft: 10}]}>{item.pop}%</Text>
              </View>
              <View style={styles.lineView2} />
              <View style={styles.topLeftView}>
                <View style={styles.hourView4}>
                  <Text style={styles.hourTxt2}>{item.tem}°c</Text>
                </View>
              </View>
            </View>
          </View>
      )
    })
    return hourData;
  }

  render() {
    const { AT, minT, maxT, pop, wx, rh, currentDate, currentDay, wxImage } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.locView1}>
          <View style={styles.topView}>
            <Image
              style={styles.imgloc}
              source={require('../../image/ic_location.png')}
            />
            <View style={styles.locTxtView}>
              <Text style={styles.txt2}>桃園市桃園區</Text>
            </View>
            <View style={styles.clockTxtView1}>
              <View style={styles.clockTxtView2}>
                <Image
                  style={styles.imgclock}
                  source={require('../../image/ic_clock.png')}
                />
                <Text style={[styles.txt2, { marginTop: 7 }]}>{currentDate} {currentDay}</Text>
              </View>
            </View>
          </View>
        </View>
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
        {this.renderHourData(testData)}
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