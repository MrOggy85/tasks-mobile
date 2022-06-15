import request from '../request';
import { load } from '../storage';
import type { Tag } from './types';

type Add = {
  name: Tag['name'];
  bgColor: Tag['bgColor'];
  textColor: Tag['textColor'];
};

async function add(task: Add): Promise<boolean> {
  const authHeader = await load('AUTH_HEADER');
  if (!authHeader) {
    throw new Error('No Auth Header!');
  }
  const data = await request({
    path: '/tags', method: 'POST', data:
    {
      ...task,
    }, authHeader,
  });
  return data;
}


export default add;
