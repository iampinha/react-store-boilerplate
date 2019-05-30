import { methods } from '../lib/api';

const { del, get, post, put } = methods;

export const Users = {
    GET_SINGLE: async id => {
        const r = await get(`users/${id}`);

        return r.data;
    },

    GET: async () => {
        const r = await get('users');

        return r.data;
    },

    PUT: async data => {
        const r = await put('users', {
            data
        });

        return r.data;
    },

    DEL: async id => {
        const r = await del(`users/${id}`);

        return { ...r, id };
    },

    POST: async ({ id, ...data }) => {
        const r = await post(`users/${id}`, {
            data
        });

        return r.data;
    }
}
