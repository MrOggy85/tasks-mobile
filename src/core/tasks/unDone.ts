import request from '../request';
import { load } from '../storage';

async function unDone(id: number): Promise<boolean> {
  const authHeader = await load('AUTH_HEADER');
  if (!authHeader) {
    throw new Error('No Auth Header!');
  }
  const data = await request({ path: `/tasks/${id}/undone`, method: 'POST', authHeader });
  return data;
}


export default unDone;
