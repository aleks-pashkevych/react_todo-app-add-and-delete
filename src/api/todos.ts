import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 4400;

const URL = `/todos?userId=${USER_ID}`;

export const getTodos = () => {
  return client.get<Todo[]>(URL);

  return client.post(`URL`, {});
};

// Add more methods here
