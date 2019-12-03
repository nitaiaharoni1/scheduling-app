import axios from 'axios'
import {handleError} from "./api-utils";

export const getEventsApi = async (organization, room) => {
    try {
        const res = await axios.get(`/events/${organization}/${room}`);
        if (res.status === 200 && res.data.events) {
            return res.data.events;
        } else {
            return null;
        }
    } catch (e) {
        handleError(e);
        return null;
    }
};

export const putEventApi = async (organization, room, event) => {
    try {
        const res = await axios.put(`/events/${organization}/${room}`, event);
        if (res.status === 200) {
            return res.data.events;
        } else {
            return null;
        }
    } catch (e) {
        handleError(e);
        return null;
    }
};

export const postEventApi = async (organization, room, event) => {
    try {
        const res = await axios.post(`/events/${organization}/${room}`, event);
        if (res.status === 200) {
            return res.data.events;
        } else {
            return null;
        }
    } catch (e) {
        handleError(e);
        return null;
    }
};

export const deleteEventApi = async (organization, room, event) => {
    try {
        const res = await axios.delete(`/events/${organization}/${room}/${event.id}`);
        if (res.status === 200) {
            return res.data.events;
        } else {
            return null;
        }
    } catch (e) {
        handleError(e);
        return null;
    }
};