import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type Products = {
    id: number;
    plu: string;
    name: string;
    product_category_id: number;
    active: string;
    created_user: string;
    created_date: string;
    updated_user: string;
    updated_date: string;
};

export const productApi = createApi({
    reducerPath: 'productApi',
    refetchOnFocus: true,
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api/',
    }),
    endpoints: (builder) => ({
        getProduct: builder.query<Products[], null>({
            query: () => 'product',
        }),
        getProductById: builder.query<Products, { id: string }>({
            query: ({ id }) => `product/${id}`,
        }),
        addProducts: builder.mutation<Products, Partial<Products>>({
            query: (body) => ({
                url: `product`,
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const {
    useGetProductQuery,
    useGetProductByIdQuery,
    useAddProductsMutation,
} = productApi;
