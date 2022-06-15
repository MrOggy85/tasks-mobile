import request from '../request';
import { load } from '../storage';
import type { Task } from './types';

async function getAll(): Promise<Task[]> {
  const authHeader = await load('AUTH_HEADER');
  if (!authHeader) {
    throw new Error('No Auth Header!');
  }
  const data = await request({ path: '/tasks', method: 'GET', authHeader });
  return data;
}


export default getAll;
