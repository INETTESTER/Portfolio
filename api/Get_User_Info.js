import http from 'k6/http';
import { domain, token } from './env.js';

export function Get_User_Info() {
    const url = `${domain}/api/profile/v1/user_info`;

    const params = {
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    };

    const response = http.get(url, params);

    //console.log(response.body);

    return response;
}