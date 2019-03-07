import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import styles from './styles';
import { TestActions } from '../../fetch/TestAction';
import { ActionTypes } from '../../constants/Actions';

class InitPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      isLoading: false,
    };
  }
  componentDidMount() {
    var date1 = moment(new Date()).format("YYYY-MM-DDTHH:mm:ss");
    var date2 = moment(new Date()).add(1, 'day').format("YYYY-MM-DDTHH:mm:ss");
    var url = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-005?Authorization=CWB-D8B8B83D-A283-465C-97CD-AB69E9FE7A90&locationName=桃園區&timeFrom=' + date1;
    url += '&timeTo=' + date2;
    this.props.TestActions(url);
  }
  static getDerivedStateFromProps(nextProps, prevState){
    const {state, isLoading, data} = nextProps.TestReducer;
    if(isLoading !== prevState.isLoading) {
      if(state === ActionTypes.TEST_ACTION_SUCCESS) {
        return {
          data: data,
          isLoading: isLoading
        };
      } else {
        return {
          data: '',
          isLoading: isLoading
        };
      }
    } else {
      return {
        data: '',
        isLoading: false
      };
    }
 }

  componentDidUpdate(prevProps) {
    const {state, isLoading, data} = this.props.TestReducer;
    if(prevProps.isLoading !== isLoading) {
      if(state === ActionTypes.TEST_ACTION_SUCCESS) {
        if(data && data.length !== 0) {
          this.setWeatherData(data.records.locations[0].location[0].weatherElement);
        }
      }
    }
  }

  setWeatherData(dataList) {
   var dataMap = {};
   dataList.forEach(function(item){
    console.log(item);
  });
 }

  render() {
    const { data } = this.state;
    
    return (
      <View style={styles.container}>
        <View style={styles.locView1}>
          <View style={styles.topView}>
            <Image
              style={styles.imaloc}
              source={require('../../image/ic_location.png')}
            />
            <View style={styles.locTxtView}>
              <Text style={styles.txt2}>桃園市桃園區</Text>
            </View>
            <View style={styles.clockTxtView1}>
              <View style={styles.clockTxtView2}>
                <Image
                  style={styles.imaclock}
                  source={require('../../image/ic_clock.png')}
                />
                <Text style={[styles.txt2, { marginTop: 7 }]}>2019/3/2 SAT</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.cardView}>
          <View style={styles.topView}>
            <View style={styles.topLeftView}>
              <View style={styles.imaView}>
                <Image
                  style={styles.mainIma}
                  source={require('../../image/ic_cloud_rain_sun.png')}
                />
              </View>
              <View style={styles.txtView1}>
                <Text style={styles.txt1}>多雲時晴</Text>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={{ height: 23, width: 23, marginTop: 5 }}
                    source={require('../../image/ic_umbrella.png')}
                  />
                  <Text style={{ fontSize: 23, color: '#FFF', marginLeft: 7}}>100%</Text>
                </View>

              </View>
            </View>
            <View style={styles.lineView1} />
              <View style={styles.topRightView}>
                <Text style={styles.txt4}>體感溫度</Text>
                <View style={styles.align_items_center}>
                  <Text style={styles.txt5}>20°c</Text>
                  <View style={styles.txtView2}>
                    <Text style={styles.txt6}>18°c~22°c</Text>
                  </View>
                </View>
              </View>
          </View>
        </View>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    TestReducer: state.TestReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
      ...bindActionCreators({ TestActions }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InitPage)
// this.props.navigation.navigate('TestPage')