import { Navigation, NavigationFunctionComponent } from 'react-native-navigation';
import { LOGIN, TASK_LIST, TASK_DETAIL } from './screens';
import WithRedux from '../redux/WithRedux';
import TaskListScreen from '../../screens/TaskListScreen';
import TaskDetailsScreen from '../../screens/TaskDetailsScreen';
import LoginScreen from '../../screens/LoginScreen';
import { load, save } from '../storage';
import getFontFamily from '../getFontFamily';
import goToRoot from './goToRoot';

type Screen = Parameters<typeof goToRoot>[0];

const LOGOUT_BTN_ID = 'LOGOUT_BTN';

const TaskListScreenWithRedux = WithRedux(TaskListScreen) as NavigationFunctionComponent;
TaskListScreenWithRedux.options = {
  topBar: {
    title: {
      text: 'Tasks',
      fontSize: 28,
      fontFamily: getFontFamily(),
    },
    background: {
      color: 'lightsteelblue',
    },
    rightButtons: [
      {
        id: LOGOUT_BTN_ID,
        text: 'Logout',

      },
    ],
  },
};

const TaskDetailsScreenWithRedux = WithRedux(TaskDetailsScreen) as NavigationFunctionComponent;

Navigation.registerComponent(TASK_LIST, () => TaskListScreenWithRedux);
Navigation.registerComponent(TASK_DETAIL, () => TaskDetailsScreenWithRedux);
Navigation.registerComponent(LOGIN, () => LoginScreen);

Navigation.events().registerNavigationButtonPressedListener(async (event) => {
  if (event.buttonId === LOGOUT_BTN_ID) {
    await save('AUTH_HEADER', '');
    await goToRoot('LOGIN');
  }
});

Navigation.events().registerAppLaunchedListener(async () => {
  const authHeader = await load('AUTH_HEADER');
  const screenName: Screen = authHeader ? 'TASK_LIST' : 'LOGIN';

  await goToRoot(screenName);
});
