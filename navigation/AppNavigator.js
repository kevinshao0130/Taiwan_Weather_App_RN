import { createStackNavigator, createAppContainer } from 'react-navigation';
import InitPage from '../components/InitPage';
import TestPage from '../components/TestPage';

const RootStack = createStackNavigator(
    {
      InitPage: { screen: InitPage,
        navigationOptions: {
          headerStyle: {display:"none"},
          headerLeft: null
        },
      },
      TestPage: { screen: TestPage },
    },
    {
      initialRouteName: 'InitPage'
    }
  );
  
const AppNavigator = createAppContainer(RootStack);
  
export default AppNavigator;