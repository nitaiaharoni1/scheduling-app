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

export const postEventsApi = async (organization, room, events) => {
    try {
        const res = await axios.put(`/rooms/${organization}/${room}`, events);
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