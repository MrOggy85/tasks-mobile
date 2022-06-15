import { BASE_URL, AUTH_HEADER } from '@env';

console.log('BASE_URL', BASE_URL);
console.log('AUTH_HEADER', AUTH_HEADER);

type KEY =
  | 'BASE_URL'
  | 'AUTH_HEADER';

function getEnv(key: KEY) {
  switch (key) {
    case 'BASE_URL':
      return BASE_URL;
    case 'AUTH_HEADER':
      return AUTH_HEADER;

    default:
      throw new Error(`No env var for: ${key}`);
  }
}

export default getEnv;
