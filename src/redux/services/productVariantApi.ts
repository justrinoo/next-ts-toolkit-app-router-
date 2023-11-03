import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type ProductsVariant = {
    id: number;
    product_id: number;
    code: string;
    name: string;
    image_location: string;
    qty: number;
    price: number;
    active: string;
    created_user: string;
    created_date: string;
    updated_user: string;
    updated_date: string;
};

export const productVariantApi = createApi({
    reducerPath: 'productVariantApi',
    refetchOnFocus: true,
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api/',
    }),
    endpoints: (builder) => ({
        getProductVariant: builder.query<ProductsVariant[], null>({
            query: () => 'product-variant',
        }),
        getProductVariantById: builder.query<ProductsVariant, { id: string }>({
            query: ({ id }) => `product-variant/${id}`,
        }),
        addProductVariant: builder.mutation<ProductsVariant, Partial<ProductsVariant>>({
            query: (body) => ({
                url: `product-variant`,
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const {
    useGetProductVariantQuery,
    useGetProductVariantByIdQuery,
    useAddProductVariantMutation,
} = productVariantApi;
