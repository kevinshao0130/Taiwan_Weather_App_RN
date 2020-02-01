import { createStackNavigator, createAppContainer } from 'react-navigation';
import InitPage from '../components/InitPage';

const RootStack = createStackNavigator(
    {
      InitPage: { screen: InitPage,
        navigationOptions: {
          headerStyle: {display:"none"},
          headerLeft: null
        },
      }
    },
    {
      initialRouteName: 'InitPage'
    }
  );
  
const AppNavigator = createAppContainer(RootStack);
  
export default AppNavigator;