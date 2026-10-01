import http from 'k6/http';
import { domain, token } from './env.js';

export function List_CPD_Activity() {
    const url = `${domain}/api/activity_cpd/v1/list`;

    const params = {
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    };

    const response = http.get(url, params);

    //console.log(response.body);

    return response;
}