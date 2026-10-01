import http from 'k6/http';
import { domain, student_token } from './env.js';

export function List_Learner_Activity() {
    const url = `${domain}/api/learner_activity/v1/list`;

    const params = {
        headers: {
            'Authorization': 'Bearer ' + student_token,
        },
    };

    const response = http.get(url, params);

    //console.log(response.body);

    return response;
}