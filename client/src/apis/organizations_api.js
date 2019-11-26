import axios from 'axios'

export const organizationsApi = async () => {
    try {
        const res = await axios.get(`/organizations`);
        if (res.status === 200) {
            return res.data.organizations;
        } else {
            return null;
        }
    } catch (e) {
        console.error(e);
        return null;
    }
};