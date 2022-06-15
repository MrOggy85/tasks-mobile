import request from '../request';
import { load } from '../storage';
import type { Task } from './types';

type Update = {
  id: Task['id'];
  title: Task['title'];
  description: Task['description'];
  startDate: Task['startDate'];
  endDate: Task['endDate'];
  repeat: Task['repeat'];
  repeatType: Task['repeatType'];
  priority: Task['priority'];
  tagIds: number[];
};

async function update(task: Update): Promise<boolean> {
  const authHeader = await load('AUTH_HEADER');
  if (!authHeader) {
    throw new Error('No Auth Header!');
  }
  const data = await request({
    path: '/tasks', method: 'PUT', data:
    {
      ...task,
    }, authHeader,
  });
  return data;
}


export default update;
