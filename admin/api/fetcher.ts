import axios from 'axios';
import Cookies from 'js-cookie';

export const fetcher = 
(url: string) => axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/${url}`,
    {
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
        }
    }   
).then(res => res.data)