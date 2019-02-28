/**
 * C:\Users\User\Desktop\RN_1
 * react-native run-android
 * CWB-D8B8B83D-A283-465C-97CD-AB69E9FE7A90
 */

import React, {Component} from 'react';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

const store = configureStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator/>
      </Provider>
    );
  }
}

export default App;
