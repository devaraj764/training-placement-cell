import axios from 'axios';

export const uri = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api'
console.log(uri)

// myAxios.js
const instance = axios.create({
    baseURL: uri,
    headers: {
        common: {
            "auth-token": localStorage.getItem('admin-token')
        }
    }
});

export default instance;