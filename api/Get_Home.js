import http from 'k6/http';
import { domain, token } from './env.js';

export function Get_Home() {
    const url = `${domain}/api/home/v1/home`;

    const params = {
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    };

    const response = http.get(url, params);

    //console.log(response.body);

    return response;
}