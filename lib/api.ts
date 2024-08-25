
import { constants } from '@/config/constants';
import axios, { CreateAxiosDefaults } from 'axios';
import { getSession } from 'next-auth/react';


const createAxiosInstance = (options: CreateAxiosDefaults = {}) => {
  const defaultConfig = {
    baseURL: constants.apiBaseUrl,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };

  const config = { ...defaultConfig, ...options };
  return axios.create(config)
};

const axiosInstance = createAxiosInstance();

axiosInstance.interceptors.request.use( async(config) => {  
  const session = await getSession()
  console.log({axios_session: session?.user})
  if (session && session.user.jwt) {  
    if (config.headers) config.headers['Authorization'] =`Bearer ${session.user.jwt}`;  
  }  
  return config;  
},  
(error) => {  
  return Promise.reject(error);  
} );


axiosInstance.interceptors.response.use(  
  (response) => {  
    return response;  
  },  
  (error) => {  
    return Promise.reject(error);  
  }  
);

const api = axiosInstance;
const protectedApi = axiosInstance;
export {createAxiosInstance, api, protectedApi};
