import axios from 'axios'
import {handleError} from "./api-utils";

export const loginApi = async (email, password, checkbox) => {
    try {
        const res = await axios.post(`/users/login`, {email, password, checkbox});
        if (res.status === 200) {
            return res.data;
        } else {
            return null;
        }
    } catch (e) {
        handleError(e);
        return null;
    }
};

export const signupApi = async (firstName, lastName, password, email, organization) => {
    try {
        const res = await axios.post(`/users/signup`, {firstName, lastName, password, email, organization});
        if (res.status === 200) {
            return res.data;
        } else {
            return null;
        }
    } catch (e) {
        handleError(e);
        return null;
    }
};

export const logoutApi = async () => {
    try {
        const res = await axios.post(`/users/logout`);
        if (res.status === 200) {
            return res.data;
        } else {
            return null;
        }
    } catch (e) {
        handleError(e);
        return null;
    }
};


export const getDataApi = async () => {
    try {
        const res = await axios.get(`/users/data`);
        if (res.status === 200) {
            return res.data;
        } else {
            return null;
        }
    } catch (e) {
        handleError(e);
        return null;
    }
};