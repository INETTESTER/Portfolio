import http from 'k6/http';
import { domain, token } from './env.js';
import { SharedArray } from 'k6/data'; ///POST กรณี id ไม่ซ้ำ (ดึง id จากไฟล์ json)
const data = new SharedArray('id', function () {
    return JSON.parse(open('../file/data.json')).portfolio.map(item => item._id);
});

export function Update_Portfolio(cid, scenario) {
    const id = data[scenario.iterationInTest];
    //console.log(id);
    const title = `${__VU}${__ITER}${cid}`;
    const url = `${domain}/api/portfolio/v1/update/` + id;

    const payload = JSON.stringify({
        title: 'ผลงานตั้งต้น (loadtest) แก้ไข ' + title,
        description: 'แก้ไขจาก load test',
        type: 'วิชาการ',
        year: 2569,
        have_award: true,
        award_level: 'เขตพื้นที่การศึกษา',
        award_name: 'ชนะเลิศอันดับ 1',
        award_no: 'LT-' + title,
        award_date: '2026-01-10',
        department: 'กลุ่มสาระการเรียนรู้คณิตศาสตร์',
        approved: true,
        pa_aspect: 'ทักษะการจัดการเรียนรู้และการจัดการชั้นเรียน',
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
    };

    const response = http.put(url, payload, params);

    //console.log(response.body);

    return response;
}