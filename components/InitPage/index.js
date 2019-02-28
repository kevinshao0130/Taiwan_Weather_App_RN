import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
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
    this.props.TestActions();
  }
  static getDerivedStateFromProps(nextProps, prevState){
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
 }
  render() {
    const { data } = this.props.TestReducer;
    const { text } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{text}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            console.log(data)
          }
        >
        </TouchableOpacity>
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