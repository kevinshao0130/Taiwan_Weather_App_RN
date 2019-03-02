import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './styles';
import { TestActions } from '../../fetch/TestAction';
import { ActionTypes } from '../../constants/Actions';

class InitPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Hello World!',
      isLoading: false
    };
  }
  componentDidMount (){
    // this.props.TestActions();
  }
  /*static getDerivedStateFromProps(nextProps, prevState){
    const {state, isLoading, data} = nextProps.TestReducer;
    if(isLoading !== prevState.isLoading) {
      if(state === ActionTypes.TEST_ACTION_SUCCESS) {
        return {
          text: data.result.resource_id,
          isLoading: isLoading
        };
      } else {
        return {
          text: 'Hello World!',
          isLoading: isLoading
        };
      }
    } else {
      return {
        text: 'Hello World!',
        isLoading: false
      };
    }
 }*/
  render() {
    //const { data } = this.props.TestReducer;
    const { text } = this.state;
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
                <Text style={styles.txt2}>2019/3/2 Sat</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.topView}>
          <View style={styles.topLeftView}>
            <View style={styles.imaView}>
              <Image
                source={require('../../image/ic_cloud_sun.png')}
              />
            </View>
            <View style={styles.txtView1}>
              <Text style={styles.txt1}>多雲時晴</Text>
            </View>
          </View>
          <View style={styles.topRightView} />
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