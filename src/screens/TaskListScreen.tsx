import React, { ComponentProps, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { NavigationComponentProps, NavigationFunctionComponent } from 'react-native-navigation';
import Button from '../components/Button/Button';
import useAppSelector from '../core/redux/useAppSelector';
import useAppDispatch from '../core/redux/useAppDispatch';
import { getAll } from '../core/tasks/taskSlice';
import goToScreen from '../core/navigation/goToScreen';
import TaskDetailsScreen from './TaskDetailsScreen';

type Props = NavigationComponentProps;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'whitesmoke',
  },
  topButtonWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderColor: '#999',
  },
  scrollView: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  activityIndicator: {
    margin: 5,
  },
});

type Screen = Parameters<typeof goToScreen>[0]['screenName'];
type DetailsScreenProps = Omit<ComponentProps<typeof TaskDetailsScreen>, 'componentId'>;

async function goTo(screenName: Screen, titleText: string, componentId: Props['componentId']) {
  await goToScreen({
    screenName,
    titleText,
    componentId,
  });
}

const TaskListScreen: NavigationFunctionComponent<Props> = ({ componentId }: Props) => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(state => state.tasks.tasks);
  const loading = useAppSelector(state => state.tasks.loading);

  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(getAll());
    }
  }, [dispatch, tasks]);

  const onRefresh = async () => {
    const action = await dispatch(getAll());
    if (action.type !== getAll.fulfilled.type) {
      Alert.alert('Error', action.payload as string);
    }
  };

  const goToNewScreen = async () => {
    await goTo('TASK_DETAIL', 'New Task', componentId);
  };
  const goToEditScreen = async (id: number) => {
    await goToScreen<DetailsScreenProps>({
      screenName: 'TASK_DETAIL',
      titleText: '',
      componentId,
      passProps: {
        id,
      },
    });
  };

  return (
    <View style={styles.root}>
      <View style={styles.topButtonWrapper}>
        <Button
          text="NEW"
          onPress={() => {
            goToNewScreen();
          }}
        />

        <Button
          text="REFRESH"
          onPress={onRefresh}
          loading={loading}
          color="SUCCESS"
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollView}>
        {loading ? (
          <ActivityIndicator
            color="#888"
            size={24}
            style={styles.activityIndicator}
          />) : null}

        {tasks.map(x => {
          return (
            <Button
              key={x.id}
              text={x.title}
              onPress={() => {
                goToEditScreen(x.id);
              }}
              color="WHITE"
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

TaskListScreen.options = {
  topBar: {
    background: {
      color: 'red',
    },
  },
};

export default TaskListScreen;
