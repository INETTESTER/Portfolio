import http from 'k6/http';
import { domain, token } from './env.js';

export function List_Term() {
    const url = `${domain}/api/education/v1/list_term`;

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