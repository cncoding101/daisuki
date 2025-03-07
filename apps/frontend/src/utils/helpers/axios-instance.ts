import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const client = axios.create({
  baseURL: import.meta.env.API_URL,
});

const request = (options: AxiosRequestConfig) => {
  const onSuccess = (response: AxiosResponse) => {
    console.debug('Request succesful!', response);
    return response.data;
  };

  const onError = (error: AxiosError) => {
    console.error('Request failed:', error.config);

    if (error.response == null) {
      console.error('Error message:', error.message);
    } else {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      console.error('Headers:', error.response.headers);
    }

    return Promise.reject(error.response ?? error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;
