import { Navigation } from 'react-native-navigation';
import * as screens from './screens';

type Screen = keyof typeof screens;

async function goToRoot(screenName: Screen) {
  const name = screens[screenName];

  await Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name,
            },
          },
        ],
      },
    },
  });
}

export default goToRoot;
