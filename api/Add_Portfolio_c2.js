import http from 'k6/http';
import { domain, token } from './env.js';

export function Add_Portfolio_c2(cid) {
    const title = `${__VU}${__ITER}${cid}`;
    const url = `${domain}/api/portfolio/v1/add`;

    const payload = JSON.stringify({
        school_id: 'loadtest-school-0001',
        title: 'ผลงาน loadtest ' + title,
        description: 'ข้อมูลจาก load test',
        type: 'วิชาการ',
        year: 2569,
        have_award: false,
        department: 'กลุ่มสาระการเรียนรู้คณิตศาสตร์',
        approved: true,
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