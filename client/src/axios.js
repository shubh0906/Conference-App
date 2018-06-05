import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3101'
});

export default instance;