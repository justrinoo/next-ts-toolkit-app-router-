'use client';

import { useAddProductsMutation } from '@/redux/services/productApi';
import { useGetProductCategoryQuery } from '@/redux/services/productCategoryApi';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface Products {
    name: string;
    product_category_id: number;
}

export default function CreateProduct() {
    const router = useRouter();
    const { data, refetch } = useGetProductCategoryQuery(null);
    const [product, setProducts] = useState<Products>({
        name: '',
        product_category_id: 0,
    });
    const [addProducts, { error, status, reset }] = useAddProductsMutation();

    const onChangeInputTexxt: React.ChangeEventHandler<HTMLInputElement> = (
        e
    ) => {
        setProducts({ ...product, [e.target.name]: e.target.value });
    };
    const onChangeInputSelect: React.ChangeEventHandler<HTMLSelectElement> = (
        e
    ) => {
        setProducts({ ...product, [e.target.name]: e.target.value });
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                addProducts(product);
                alert('Refresh untuk melihat data terbaru');
                return router.push('/master/product');
            }}
        >
            <div className='grid grid-cols-2 gap-x-5 gap-y-5 mt-4'>
                <div>
                    <label>Nama Produk</label>
                    <input
                        type='text'
                        name='name'
                        onChange={onChangeInputTexxt}
                        className='w-full border-[1px] border-gray-600 outline-none py-2 px-4 rounded mt-2'
                        placeholder='Masukan Nama Produk...'
                    />
                </div>
                <div>
                    <label>Produk Kategori</label>
                    <select
                        name='product_category_id'
                        onChange={onChangeInputSelect}
                        className='border-[1px] border-gray-600 outline-none py-2 px-2 w-full mt-3 rounded'
                    >
                        <option selected>Pilih Kategori</option>
                        {data?.length > 0 &&
                            data?.map((category, idx) => {
                                return (
                                    <option key={idx} value={category.id}>
                                        {category.name}
                                    </option>
                                );
                            })}
                    </select>
                </div>
            </div>

            <button className='bg-black text-white font-semibold rounded-md py-2 px-6 mt-6'>
                Create Product
            </button>
        </form>
    );
}
