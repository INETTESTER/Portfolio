import http from 'k6/http';
import { domain, student_token } from './env.js';

export function Get_Home_Student() {
    const url = `${domain}/api/home/v1/home`;

    const params = {
        headers: {
            'Authorization': 'Bearer ' + student_token,
        },
    };

    const response = http.get(url, params);

    //console.log(response.body);

    return response;
}