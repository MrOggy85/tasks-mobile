import { BASE_URL } from '@env';

console.log('BASE_URL', BASE_URL);

type KEY =
  | 'BASE_URL';

function getEnv(key: KEY) {
  switch (key) {
    case 'BASE_URL':
      return BASE_URL;

    default:
      throw new Error(`No env var for: ${key}`);
  }
}

export default getEnv;
