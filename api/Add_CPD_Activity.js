import http from 'k6/http';
import { domain, token } from './env.js';

export function Add_CPD_Activity(cid) {
    const topic = `${__VU}${__ITER}${cid}`;
    const url = `${domain}/api/activity_cpd/v1/add`;

    const payload = JSON.stringify({
        topic: 'อบรม loadtest ' + topic,
        hours: 6,
        training_date: '2569-05-20',
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