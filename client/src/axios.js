import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3101'
});


//instance.defaults.headers.common['x-auth'] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjE2ODY0NWE1NmNiODJkNGQzMGJjZmYiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTI4Mjc4NzE5fQ.VSi2ox5B22rSRwYjAnf5dh_hI2z52LPdR3Qf21vbhQQ";
export default instance;