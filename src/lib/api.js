import axios from 'axios';
import { API_URL } from '../constants';

/**
 * Create an Axios Client
 * with defaults
 */
const client = axios.create({
  baseURL: API_URL
});

/**
 * Sucess response
 */
const onSuccess = (response, fullResponse = false) => {
  console.debug('\nRequest Successful', response, '\n');
  return !fullResponse ? response.data : response;
};

/**
* Error response
*/
const onError = error => {
  console.debug('\nRequest Fail', error, '\n');
  if (error.response) {
      // Request was made but server
      // responded with other  code
      // than 2xx
      console.error('\nStatus:',  error.response.status, '\n');
      console.error('\nData:',    error.response.data, '\n');
      console.error('\nHeaders:', error.response.headers, '\n');
  } else {
      // Something else happened while
      // setting up the request
      // triggered the error
      console.error('\nError Message:', error.message, '\n');
  }

  return Promise.reject(error.response || error.message || error);
};

const request = async (options, fullResponse = false) => {
  try {
      const response = await client(options);

      return onSuccess(response, fullResponse);
  } catch (err) {
      return onError(err);
  }
};

export const methods = {
  get: async (url, options) => {
    const opts = Object.assign({}, options, { url, method: 'GET' });

    return await request(opts);
  },

  post: async (url, options) => {
    const opts = Object.assign({}, options, { url, method: 'POST' });

    return await request(opts);
  },

  put: async (url, options) => {
    const opts = Object.assign({}, options, { url, method: 'PUT' });

    return await request(opts);
  },

  del: async (url, options) => {
    const opts = Object.assign({}, options, { url, method: 'DELETE' });

    return await request(opts);
  }
}