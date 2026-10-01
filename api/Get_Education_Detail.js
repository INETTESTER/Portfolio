import http from 'k6/http';
import { domain, token } from './env.js';

export function Get_Education_Detail() {
    const url = `${domain}/api/education/v1/detail`;

    const payload = JSON.stringify({
        academic_period_id: '10ad7e570000000000000002',
    });

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