import { configureStore } from '@reduxjs/toolkit';
// import { sendReminder } from '../reminders';
import rootReducer from './rootReducer';

// declare module 'react-redux' {
//   // eslint-disable-next-line @typescript-eslint/no-empty-interface
//   export interface DefaultRootState extends RootState { }
// }

const store = configureStore({
  reducer: rootReducer,
});

// export type RootState = ReturnType<typeof store.getState>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// setInterval(() => {
//   const tasks = store.getState().tasks.tasks;
//   sendReminder(tasks);
// }, 1000 * 60);

export default store;
