
import { constants } from '@/config/constants';
import axios, { CreateAxiosDefaults } from 'axios';
import { getSession } from 'next-auth/react';
let cachedSession: any = null;




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
  let session = cachedSession;
  console.log("Old session", Boolean(cachedSession))
  if(!cachedSession) {
    session = await getSession();
    cachedSession = session;
    console.log("Fectched new session")
  }
  if (session && session.user.jwt) {  
    if (config.headers) config.headers['Authorization'] =`Bearer ${session.user.jwt}`;  
  }  
  return config;  
},  
(error) => {  
  return Promise.reject(error);  
} );


const api = axiosInstance;
const protectedApi = axiosInstance;
export {createAxiosInstance, api, protectedApi};
