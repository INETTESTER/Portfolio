import http from 'k6/http';
import { domain, token } from './env.js';

export function Get_Experience_Detail() {
    const url = `${domain}/api/experience/v1/detail`;

    const payload = JSON.stringify({});

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
    };

    const response = http.post(url, payload, params);

    //console.log(response.body);

    return response;
}