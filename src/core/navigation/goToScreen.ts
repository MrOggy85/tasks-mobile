import { Navigation } from 'react-native-navigation';
import * as screens from './screens';

type Screen = keyof typeof screens;

type Params<P> = {
  screenName: Screen;
  titleText: string;
  componentId: string;
  passProps?: P;
};

async function goToScreen<P>({ screenName, titleText, componentId, passProps }: Params<P>) {
  const name = screens[screenName];

  await Navigation.push(componentId, {
    component: {
      name,
      options: {
        topBar: {
          title: {
            text: titleText,
          },
        },
      },
      passProps,
    },
  });
}

export default goToScreen;
