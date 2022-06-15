import request from '../request';

async function login(authHeader: string): Promise<string> {
  const data = await request({ path: '/', method: 'GET', authHeader });
  return data;
}


export default login;
