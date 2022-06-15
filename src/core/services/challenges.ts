import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from './request';

type Tag = {
  id: string;
  name: string;
}

export type Challenge = {
  id: string;
  name: string;
  tags: Tag[];
}

export async function getAll() {
  let result: AxiosResponse<Challenge[]>;
  try {
    result = await axios.get<Challenge[]>(`${BASE_URL}/challenges`);
  } catch (error) {
    return null;
  }

  return result.data;
}

type AddChallenge = Pick<Challenge, 'name'> & {
  tagIds: Tag['id'][];
}

export async function add(challenge: AddChallenge) {
  try {
    await axios.post<Challenge>(`${BASE_URL}/challenges`, {
      ...challenge,
    });
  } catch (error) {
    return false;
  }
  return true;
}

type UpdateChallenge = Pick<Challenge, 'id' | 'name'> & {
  tagIds: Tag['id'][];
}

export async function update(challenge: UpdateChallenge) {
  try {
    await axios.put<Challenge>(`${BASE_URL}/challenges`, {
      ...challenge,
    });
  } catch (error) {
    return false;
  }
  return true;
}

export async function remove(id: Challenge['id']) {
  try {
    await axios.delete<Challenge>(`${BASE_URL}/challenges/${id}`);
  } catch (error) {
    return false;
  }
  return true;
}
