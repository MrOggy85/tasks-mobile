import axios from 'axios';
import { BASE_URL } from './request';

export type Tag = {
  id: string;
  name: string;
}

export async function getAll() {
  try {
    const result = await axios.get<Tag[]>(`${BASE_URL}/tags`);
  return result.data;
  } catch (error) {
    return null;
  }
}

type TagAdd = Omit<Tag, 'id'>;

export async function add(tag: TagAdd) {
  try {
    await axios.post(`${BASE_URL}/tags`, {
      ...tag,
    });
  } catch (error) {
    return false;
  }

  return true;
}

export async function update(tag: Tag) {
  try {
    await axios.put(`${BASE_URL}/tags`, {
      ...tag,
    });
  } catch (error) {
    return false;
  }

  return true;
}

export async function remove(id: Tag['id']) {
  try {
    await axios.delete(`${BASE_URL}/tags/${id}`);
  } catch (error) {
    return false;
  }

  return true;
}
