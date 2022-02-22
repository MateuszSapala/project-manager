import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Credentials from '../model/Credentials';

const baseUrl = 'http://localhost:8080/api/v1/';
const urlToLogin = baseUrl + 'login';
const urlToVerify = baseUrl + 'verify';

export async function sendLogin(credentials: Credentials): Promise<AxiosResponse<any, any> | boolean> {
    let returned: AxiosResponse<any, any> | boolean = false;
    await axios.post(urlToLogin, credentials)
        .then(response => {
            returned = response;
        })
        .catch(e => {
            returned = false;
        });
    return returned;
}

export async function sendVerify(auth: string): Promise<AxiosResponse<any, any> | boolean> {
    let returned: AxiosResponse<any, any> | boolean = false;
    await axios.get(urlToVerify, {
        headers: {
            "authorization": auth,
        }
    })
        .then(response => {
            returned = response;
        })
        .catch(e => {
            returned = false;
        });
    return returned;
}