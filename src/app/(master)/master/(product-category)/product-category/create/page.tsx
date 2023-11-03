'use client';

import { useAddProductCategoryMutation } from '@/redux/services/productCategoryApi';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface ProductCategory {
    name: string;
    status: string;
}

export default function CreateProductCategory() {
    const router = useRouter();
    const [productCategory, setProductsCategory] = useState<ProductCategory>({
        name: '',
        status: '',
    });
    const [addProductCategory, { error, status, reset }] =
        useAddProductCategoryMutation();

    const onChangeInputTexxt: React.ChangeEventHandler<HTMLInputElement> = (
        e
    ) => {
        setProductsCategory({
            ...productCategory,
            [e.target.name]: e.target.value,
        });
    };
    const onChangeInputSelect: React.ChangeEventHandler<HTMLSelectElement> = (
        e
    ) => {
        setProductsCategory({
            ...productCategory,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                addProductCategory(productCategory);
                alert('Refresh untuk melihat data terbaru');
                return router.push('/master/product-category');
            }}
        >
            <div className='grid grid-cols-2 gap-x-5 gap-y-5 mt-4'>
                <div>
                    <label>Nama Kategori</label>
                    <input
                        type='text'
                        name='name'
                        onChange={onChangeInputTexxt}
                        className='w-full border-[1px] border-gray-600 outline-none py-2 px-4 rounded mt-2'
                        placeholder='Masukan Nama Produk Kategori...'
                    />
                </div>
                <div>
                    <label>Status</label>
                    <select
                        name='status'
                        onChange={onChangeInputSelect}
                        className='border-[1px] border-gray-600 outline-none py-2 px-2 w-full mt-3 rounded'
                    >
                        <option selected>Pilih Status</option>
                        <option value='true'>Active</option>
                        <option value='false'>InActive</option>
                    </select>
                </div>
            </div>

            <button className='bg-black text-white font-semibold rounded-md py-2 px-6 mt-6'>
                Create Product Category
            </button>
        </form>
    );
}
