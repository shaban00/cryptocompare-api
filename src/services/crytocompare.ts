import axios, { Axios } from "axios";

/* Cryptocompare base url */

const BASE_URL: string = "https://min-api.cryptocompare.com";

/* Axios instance */

const instance: Axios = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

/* Service for getting cryptocompare prices */

const GetCrytoComparePrice = async (path: string, data: string): Promise<any> => {
    return await instance.get(`/data/${path}?${data}`);
};

export { GetCrytoComparePrice };
