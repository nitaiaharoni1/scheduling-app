import axios from 'axios'
import {handleError} from "./api-utils";

export const organizationsApi = async () => {
    try {
        const res = await axios.get(`/organizations`);
        if (res.status === 200) {
            return res.data.organizations;
        } else {
            return null;
        }
    } catch (e) {
        handleError(e);
        return null;
    }
};