import axios from 'axios';
import queryString from 'query-string';
import { MeInterface, MeGetQueryInterface } from 'interfaces/me';
import { GetQueryInterface } from '../../interfaces';

export const getUs = async (query?: MeGetQueryInterface) => {
  const response = await axios.get(`/api/us${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createMe = async (me: MeInterface) => {
  const response = await axios.post('/api/us', me);
  return response.data;
};

export const updateMeById = async (id: string, me: MeInterface) => {
  const response = await axios.put(`/api/us/${id}`, me);
  return response.data;
};

export const getMeById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/us/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteMeById = async (id: string) => {
  const response = await axios.delete(`/api/us/${id}`);
  return response.data;
};
