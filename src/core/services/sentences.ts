import axios from 'axios';
import { BASE_URL } from './request';
import { Tag } from './tags';

export type Sentence = {
  id: string;
  en: string;
  ja: string[];
  tags: Tag[];
}

export async function getAll() {
  const result = await axios.get<Sentence[]>(`${BASE_URL}/sentences`);

  return result.data;
}

export type SentenceAdd = Omit<Sentence, 'id' | 'tags'> & {
  tagIds: Tag['id'][];
};

export async function add(sentence: SentenceAdd) {
  try {
    await axios.post(`${BASE_URL}/sentences`, sentence);
  } catch (error) {
    return false;
  }
  return true;
}

type SentenceUpdate = Omit<Sentence, 'tags'> & {
  tagIds: Tag['id'][];
};

export async function update(sentence: SentenceUpdate) {
  try {
    await axios.put(`${BASE_URL}/sentences`, sentence);
  } catch (error) {
    return false;
  }

  return true;
}

export async function remove(id: Sentence['id']) {
  try {
    await axios.delete(`${BASE_URL}/sentences/${id}`);
  } catch (error) {
    return false;
  }

  return true;
}
