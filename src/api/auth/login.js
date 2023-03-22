import { post } from '../../utility/client';

const login = (body) => {
  return post('admin/login', body);
};

export { login };