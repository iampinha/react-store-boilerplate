import { methods } from '../lib/api';

const { del, get, post, put } = methods;

export const Places = {
    GET_SINGLE: async id => {
        const r = await get(`places/${id}`);

        return r.data;
    },

    GET: async () => {
        const r = await get('places');

        return r.data;
    },

    PUT: async data => {
        const r = await put('places', {
            data
        });

        return r.data;
    },

    DEL: async id => {
        const r = await del(`places/${id}`);

        return { ...r, id };
    },

    POST: async ({ id, ...data }) => {
        const r = await post(`places/${id}`, {
            data
        });

        return r.data;
    }
}
