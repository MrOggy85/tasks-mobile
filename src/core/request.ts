import axios, { Method } from 'axios';
import getEnv from './getEnv';

type Params = {
  path: string;
  method: Method;
  authHeader: string;
  data?: any;
};

const BASE_URL = getEnv('BASE_URL');

async function request({ path, method, authHeader, data }: Params) {
  console.log('BASE_URL', BASE_URL);
  const response = await axios({
    url: path,
    baseURL: BASE_URL,
    method,
    data,
    headers: {
      'Authorization': authHeader,
    },
  });

  return response.data;
}

export default request;
