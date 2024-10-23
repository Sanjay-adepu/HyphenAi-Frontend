// APIService.js
import axios from 'axios';

const API_URL = '/api'; // Adjust as per your backend URL

const processScript = (scriptText) => {
  return axios.post(`${API_URL}/generate`, { script: scriptText });
};

const generateVideo = (data) => {
  return axios.post(`${API_URL}/generate-video`, data);
};

export default {
  processScript,
  generateVideo,
};