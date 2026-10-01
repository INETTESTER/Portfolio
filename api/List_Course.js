import http from 'k6/http';
import { domain, token } from './env.js';

export function List_Course() {
    const url = `${domain}/api/education/v1/list_course`;

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