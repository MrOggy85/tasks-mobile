import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { NavigationComponentProps, NavigationFunctionComponent } from 'react-native-navigation';
import Button from '../components/Button';
import Input from '../components/Input';
import login from '../core/auth/login';
import { save } from '../core/storage';
import goToRoot from '../core/navigation/goToRoot';
import getFontFamily from '../core/getFontFamily';

type Props = NavigationComponentProps;
type Screen = Parameters<typeof goToRoot>[0];

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke',
  },
  inputWrapper: {
    width: '90%',
    marginBottom: 20,
  },
});

async function goTo(screenName: Screen) {
  await goToRoot(screenName);
}

const LoginScreen: NavigationFunctionComponent<Props> = ({ componentId }: Props) => {
  const [authHeader, setAuthHeader] = useState('');

  const onLogin = async () => {
    try {
      await login(authHeader);
      await save('AUTH_HEADER', authHeader);
      await goTo('TASK_LIST');
    } catch (error) {
      Alert.alert('failed!');
    }
  };

  return (
    <View style={styles.root}>

      <View style={styles.inputWrapper}>
        <Input
          label="Auth Header"
          text={authHeader}
          setText={setAuthHeader}
        />
      </View>

      <Button
        text="Login"
        color="INFO"
        onPress={onLogin}
      />
    </View>
  );
};

LoginScreen.options = {
  topBar: {
    title: {
      text: 'Login',
      fontSize: 28,
      fontFamily: getFontFamily(),
    },
    background: {
      color: 'coral',
    },
  },
};

export default LoginScreen;
