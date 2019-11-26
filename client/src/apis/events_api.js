import axios from 'axios'

export const getEventsApi = async (organization, room) => {
    try {
        const res = await axios.get(`/rooms/${organization}/${room}`);
        if (res.status === 200 && res.data.events) {
            return res.data.events;
        } else {
            return null;
        }
    } catch (e) {
        console.error(e);
        return null;
    }
};

export const putEventApi = async (organization, room, event) => {
    try {
        const res = await axios.put(`/rooms/${organization}/${room}`, event);
        if (res.status === 200) {
            return res.data.events;
        } else {
            return null;
        }
    } catch (e) {
        console.error(e);
        return null;
    }
};

export const postEventApi = async (organization, room, event) => {
    try {
        const res = await axios.post(`/rooms/${organization}/${room}`, event);
        if (res.status === 200) {
            return res.data.events;
        } else {
            return null;
        }
    } catch (e) {
        console.error(e);
        return null;
    }
};