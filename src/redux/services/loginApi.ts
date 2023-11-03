import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type Login = {
    username: string;
    password: string;
};

export const loginApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/auth/' }),
    tagTypes: ['Login'],
    endpoints: (build) => ({
        addLogin: build.mutation<Login, Partial<Login>>({
            query: (body) => ({
                url: `login`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Login', id: 'LIST' }],
        }),
    }),
});

export const { useAddLoginMutation } = loginApi;
