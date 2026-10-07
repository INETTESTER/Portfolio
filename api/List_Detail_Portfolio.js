import http from 'k6/http';
import { domain, token } from './env.js';

export function List_Detail_Portfolio() {
    const url = `${domain}/api/portfolio/v1/list_detail/10ad7e570000000000000006`;

    const params = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };

    const response = http.get(url, params);

    //console.log(response.body);

    return response;
}