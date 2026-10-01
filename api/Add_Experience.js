import http from 'k6/http';
import { domain, token } from './env.js';

export function Add_Experience(cid) {
    const milestone_title = `${__VU}${__ITER}${cid}`;
    const url = `${domain}/api/experience/v1/add`;

    const payload = JSON.stringify({
        school_id: 'loadtest-school-0001',
        start_date: '2015-05-16',
        end_date: '2019-03-31',
        milestone_title: 'ครูผู้ช่วย loadtest ' + milestone_title,
        learning_area_label: 'คณิตศาสตร์',
        affiliation_code: '0000000000',
        description: 'ข้อมูลจาก load test',
        tags: [
            'loadtest',
        ],
        is_current: false,
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