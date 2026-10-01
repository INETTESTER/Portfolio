import http from 'k6/http';
import { domain, token } from './env.js';

export function Get_Dropdown_List() {
    const url = `${domain}/api/dropdown/v1/list?id=6f0000000000000000000034`;

    const params = {
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    };

    const response = http.get(url, params);

    //console.log(response.body);

    return response;
}