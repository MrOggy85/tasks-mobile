import React, { useEffect, useState, ComponentProps } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import { NavigationComponentProps, NavigationFunctionComponent, Navigation } from 'react-native-navigation';
import DatePicker from 'react-native-date-picker';
import { Picker } from '@react-native-picker/picker';
import type { RootState } from '../core/redux/store';
import useAppDispatch from '../core/redux/useAppDispatch';
import useAppSelector from '../core/redux/useAppSelector';
import { getAll as getAllTags } from '../core/tags/tagSlice';
import Input from '../components/Input';
import TagPicker from '../components/TagPicker';
import Button from '../components/Button/Button';
import { add, update, remove } from '../core/tasks/taskSlice';
import getCron from '../core/getCron';
import getPrio from '../core/getPrio';

type Task = RootState['tasks']['tasks'][0];
type CronType = Parameters<typeof getCron>[0];

type OwnProps = {
  id: number;
};
type Props = OwnProps & NavigationComponentProps;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  root: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    padding: '5%',
    paddingTop: 10,
  },
  inputWrapper: {
    width: '100%',
    justifyContent: 'center',
  },
  buttonWrapper: {
    width: '100%',
  },
  tagPickerWrapper: {
    width: '100%',
  },
  datePicker: {
    height: 50,
  },
  datePickerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  datePickerRemoveBtn: {
    width: 40,
  },
  pickerWrapper: {
    width: '100%',
    height: 50,
  },
});

type ButtonDisabled = ComponentProps<typeof Pressable>['disabled'];

type SendButtonProps = {
  disabled: ButtonDisabled;
  isUpdate: boolean;
  onPress: () => void;
};

const SendButton = ({ disabled, isUpdate, onPress }: SendButtonProps) => {
  return (
    <Button
      text={isUpdate ? 'UPDATE' : 'CREATE'}
      onPress={onPress}
      disabled={disabled}
      color="INFO"
    />
  );
};

type DeleteButtonProps = {
  disabled: ButtonDisabled;
  onPress: () => void;
};

const DeleteButton = ({ disabled, onPress }: DeleteButtonProps) => (
  <Button
    text="DELETE"
    onPress={onPress}
    disabled={disabled}
    color="WARN"
  />
);

const TaskDetailsScreen: NavigationFunctionComponent<Props> = ({ componentId, id }: Props) => {
  const dispatch = useAppDispatch();
  const task = useAppSelector(state => state.tasks.tasks.find(x => x.id === id));
  const loading = useAppSelector(state => state.tasks.loading);
  const allTags = useAppSelector(state => state.tags.tags);
  console.log('allTags', allTags);

  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [startDate, setStartDate] = useState<Date | undefined>(task?.startDate ? new Date(task.startDate) : undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(task?.endDate ? new Date(task.endDate) : undefined);
  const [priority, setPriority] = useState<Task['priority']>(task?.priority || 0);
  const [tags, setTags] = useState(task?.tags || []);
  // const [repeatHelper, setRepeatHelper] = useState<CronType | ''>('');
  const [repeatCronPattern, setRepeatCronPattern] = useState(task?.repeat || '');
  const [repeatType, setRepeatType] = useState<Task['repeatType']>(task?.repeatType || 'completionDate');

  const sendDisabled = loading;

  useEffect(() => {
    dispatch(getAllTags());
  }, [dispatch]);

  const tagChoices = allTags.filter(x => !tags.some(t => t.id === x.id));

  const onPress = async () => {
    if (!task) {
      await dispatch(add({
        title,
        description,
        startDate: startDate ? startDate.toISOString() : undefined,
        endDate: endDate ? endDate.toISOString() : undefined,
        repeat: repeatCronPattern,
        repeatType,
        priority,
        tagIds: tags.map(t => t.id),
      }));
    } else {
      await dispatch(update({
        id: task.id,
        title,
        description,
        startDate: startDate ? startDate.toISOString() : undefined,
        endDate: endDate ? endDate.toISOString() : undefined,
        repeat: repeatCronPattern,
        repeatType,
        priority,
        tagIds: tags.map(t => t.id),
      }));
    }

    await Navigation.pop(componentId);
  };

  const onDeletePress = async () => {
    if (!task) {
      return;
    }
    await dispatch(remove(task.id));
    await Navigation.pop(componentId);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.root}>
        {task ? (
          <View style={styles.inputWrapper}>
            <Text selectable>
              {`ID: ${task.id}`}
            </Text>
          </View>
        ) : null}

        <View style={styles.inputWrapper}>
          <Input
            label="Title"
            text={title}
            setText={setTitle}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Input
            label="Description"
            text={description}
            setText={setDescription}
          />
        </View>

        {startDate ? (
          <View style={styles.datePickerWrapper}>
            <DatePicker
              date={startDate}
              onDateChange={setStartDate}
              is24hourSource="locale"
              locale="en-GB"
              style={styles.datePicker}
            />

            <View style={styles.datePickerRemoveBtn}>
              <Button
                text="X"
                color="WARN"
                onPress={() => {
                  setStartDate(undefined);
                }}
                height={40}
              />
            </View>
          </View>
        ) : (
          <Button
            text="StartDate"
            onPress={() => {
              setStartDate(new Date());
            }}
          />
        )}

        {endDate ? (
          <View style={styles.datePickerWrapper}>
            <DatePicker
              date={endDate}
              onDateChange={setEndDate}
              is24hourSource="locale"
              locale="en-GB"
              style={styles.datePicker}
            />

            <View style={styles.datePickerRemoveBtn}>
              <Button
                text="X"
                color="WARN"
                onPress={() => {
                  setEndDate(undefined);
                }}
                height={40}
              />
            </View>
          </View>
        ) : (
          <Button
            text="EndDate"
            onPress={() => {
              setEndDate(new Date());
            }}
          />
        )}

        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={priority}
            prompt="Priority"
            mode="dropdown"
            onValueChange={itemValue => {
              setPriority(itemValue);
            }}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ height: 50 }}
            // eslint-disable-next-line react-native/no-inline-styles
            itemStyle={{ height: 50 }}

          >
            <Picker.Item
              label="Priority"
              value={0}
            />

            {([1, 2, 3, 4] as Task['priority'][]).map(x => (
              <Picker.Item
                key={x}
                label={getPrio(x).content}
                value={x}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.tagPickerWrapper}>
          <TagPicker
            tags={tags}
            setTags={setTags}
            tagChoices={tagChoices}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Input
            label="Repeat CRON"
            text={repeatCronPattern}
            setText={setRepeatCronPattern}
          />
        </View>

        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={repeatType}
            prompt="Repeat Type"
            mode="dropdown"
            onValueChange={itemValue => {
              setRepeatType(itemValue);
            }}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ height: 50 }}
            // eslint-disable-next-line react-native/no-inline-styles
            itemStyle={{ height: 50 }}
          >
            <Picker.Item
              label="EndDate"
              value="endDate"
            />

            <Picker.Item
              label="CompletionDate"
              value="completionDate"
            />
          </Picker>
        </View>
      </View>



      <View style={styles.buttonWrapper}>
        {task?.id ? (
          <DeleteButton
            disabled={loading}
            onPress={onDeletePress}
          />
        ) : null}

        <SendButton
          disabled={sendDisabled}
          isUpdate={!!task}
          onPress={onPress}
        />
      </View>
    </SafeAreaView>
  );
};

export default TaskDetailsScreen;
