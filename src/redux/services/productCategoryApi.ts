import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type ProductsCategory = {
    id: number;
    name: string;
    active: string;
    created_user: string;
    created_date: string;
    updated_user: string;
    updated_date: string;
};

export const productCategoryApi = createApi({
    reducerPath: 'productCategoryApi',
    refetchOnFocus: true,
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api/',
    }),
    endpoints: (builder) => ({
        getProductCategory: builder.query<ProductsCategory[], null>({
            query: () => 'product-category',
        }),
        getProductCategoryById: builder.query<ProductsCategory, { id: string }>({
            query: ({ id }) => `product-category/${id}`,
        }),
        addProductCategory: builder.mutation<ProductsCategory, Partial<ProductsCategory>>({
            query: (body) => ({
                url: `product-category`,
                method: 'POST',
                body: {
                    ...body,
                    active: 'true'
                }
            }),
        }),
    }),
});

export const {
    useGetProductCategoryQuery,
    useGetProductCategoryByIdQuery,
    useAddProductCategoryMutation,
} = productCategoryApi;
