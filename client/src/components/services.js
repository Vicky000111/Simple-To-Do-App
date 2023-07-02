import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Replace with your API URL

export const get = async (url) => {
  try {
    const response = await axios.get(`${API_URL}/${url}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const post = async (url, data) => {
  try {
    const response = await axios.post(`${API_URL}/${url}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const put = async (url, data) => {
  try {
    const response = await axios.put(`${API_URL}/${url}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const remove = async (url) => {
  try {
    const response = await axios.delete(`${API_URL}/${url}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
