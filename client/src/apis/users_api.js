import axios from 'axios'

export const loginApi = async (username, password, checkbox) => {
    try {
        const res = await axios.post(`/users/login`, {username, password, checkbox});
        if (res.status === 200) {
            return res.data;
        } else {
            return null;
        }
    } catch (e) {
        console.error(e);
        return null;
    }
};

// export async function initApi() {
//     await axios.post(`${SERVER_URL}`);
// }