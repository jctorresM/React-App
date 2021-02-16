import axios from 'axios';

const instance = axios.create();

const get = async (endpoint, baseURL = 'https://torre.co/api') => {
    try {
        return await instance.get(`${baseURL}/${endpoint}`, {
            headers: {
                'access-Control-Allow-Origin': '*',
            }
        });
    } catch (e) {
        console.log( e );
    }
}

const post = async (endpoint, offset = 1, size = 10) => {
    try {
        return await instance.post(`https://search.torre.co/${endpoint}?offset=${offset}&size=${size}`);
    } catch (e) {
        console.log( e );
    }
}

const getOpportunities = async (offset = 1, size = 10) => {
    return await post("opportunities/_search", offset, size);
}

const getOpportunity = async (id) => {
    return await get(`opportunities/${id}`);
}

const getPeople = async (offset = 1, size = 20) => {
    return await post("people/_search", offset, size);
}

const getProfile = async (userName) => {
    return await get(`bios/${userName}`, "http://bio.torre.co/api/");
}

export { getOpportunities, getOpportunity, getPeople, getProfile };