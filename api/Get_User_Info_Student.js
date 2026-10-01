import http from 'k6/http';
import { domain, student_token } from './env.js';

export function Get_User_Info_Student() {
    const url = `${domain}/api/profile/v1/user_info`;

    const params = {
        headers: {
            'Authorization': 'Bearer ' + student_token,
        },
    };

    const response = http.get(url, params);

    //console.log(response.body);

    return response;
}