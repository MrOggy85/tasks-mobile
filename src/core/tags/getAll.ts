import request from '../request';
import { load } from '../storage';
import type { Tag } from './types';

async function getAll(): Promise<Tag[]> {
  const authHeader = await load('AUTH_HEADER');
  if (!authHeader) {
    throw new Error('No Auth Header!');
  }
  const data = await request({ path: '/tags', method: 'GET', authHeader });
  return data;
}


export default getAll;
