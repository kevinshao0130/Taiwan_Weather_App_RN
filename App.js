import React, { Component } from 'react'
import AppNavigator from './navigation/AppNavigator'
import { Provider } from 'react-redux'
import configureStore from './configureStore'

const store = configureStore()

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    )
  }
}

export default App
