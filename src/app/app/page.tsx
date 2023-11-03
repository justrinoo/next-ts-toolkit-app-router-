'use client';

import { useGetProductVariantQuery } from '@/redux/services/productVariantApi';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function RootPageCustomer() {
    const { data } = useGetProductVariantQuery(null);
    const router = useRouter();
    return (
        <main className='bg-[#f8f5f2] min-h-screen relative'>
            <div className='px-8 py-5 flex flex-col gap-y-8'>
                <header>
                    <nav className='flex items-center justify-between'>
                        <h5 className='text-2xl font-semibold text-[#232323]'>
                            SuperIndo Shop
                        </h5>
                        <button
                            className='relative'
                            onClick={() => {
                                return router.push('/app/cart');
                            }}
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='32'
                                height='32'
                                fill='#000000'
                                viewBox='0 0 256 256'
                            >
                                <path d='M136,120v56a8,8,0,0,1-16,0V120a8,8,0,0,1,16,0ZM239.86,98.11,226,202.12A16,16,0,0,1,210.13,216H45.87A16,16,0,0,1,30,202.12l-13.87-104A16,16,0,0,1,32,80H68.37L122,18.73a8,8,0,0,1,12,0L187.63,80H224a16,16,0,0,1,15.85,18.11ZM89.63,80h76.74L128,36.15ZM224,96H32L45.87,200H210.13Zm-51.16,23.2-5.6,56A8,8,0,0,0,174.4,184a7.44,7.44,0,0,0,.81,0,8,8,0,0,0,7.95-7.2l5.6-56a8,8,0,0,0-15.92-1.6Zm-89.68,0a8,8,0,0,0-15.92,1.6l5.6,56a8,8,0,0,0,8,7.2,7.44,7.44,0,0,0,.81,0,8,8,0,0,0,7.16-8.76Z'></path>
                            </svg>
                            <div className='absolute -top-3 -left-2 bg-green-400 text-white px-2 py-0 rounded-full'>
                                1
                            </div>
                        </button>
                    </nav>
                </header>
                <section>
                    <h4 className='text-xl'>List Produk Populer</h4>
                    <div className='grid grid-cols-3 gap-4 gap-x-4 mt-4'>
                        {data && data.length > 0 ? (
                            data.map((product, key) => (
                                <article
                                    key={key}
                                    className='border-[1px] border-gray-400 py-3 px-3 rounded-tr-3xl'
                                >
                                    <img
                                        className='rounded-md'
                                        src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3270&q=80'
                                        alt='Product'
                                    />
                                    <div className='flex flex-col items-start gap-y-2 mt-2'>
                                        <h4 className='truncate'>
                                            {product.name}
                                        </h4>
                                        <div className='flex items-center gap-x-20 justify-between'>
                                            <p>Rp. {product.price}</p>
                                            <p>Qty: {product.qty}</p>
                                        </div>
                                        <div className='custom-number-input h-10 w-32 mx-auto mb-5'>
                                            <div className='flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1'>
                                                <button className=' bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none'>
                                                    <span className='m-auto text-2xl'>
                                                        −
                                                    </span>
                                                </button>
                                                <input
                                                    type='number'
                                                    className='focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none'
                                                    name='custom-input-number'
                                                    value='0'
                                                ></input>
                                                <button className='bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer'>
                                                    <span className='m-auto text-2xl'>
                                                        +
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                        <button className='bg-[#078080] text-[#f8f5f2] py-3 px-8 rounded-md w-full font-semibold'>
                                            Add to cart
                                        </button>
                                    </div>
                                </article>
                            ))
                        ) : (
                            <p>tidak ada data.</p>
                        )}
                    </div>
                </section>
            </div>
            <div className='bg-[#f45d48] py-5 px-8 text-white w-[50%] left-0 mx-[25%] rounded-md fixed bottom-0 min-h-[200px]'>
                <h5 className='text-2xl font-semibold mb-10'>Pilih Variant</h5>
                <div className='flex items-center gap-x-5'>
                    <button className='border-2 border-[#232323] py-2 px-4 rounded-full hover:bg-white hover:text-black'>
                        Indomie Goreng Rebus
                    </button>
                    <button className='border-2 border-[#232323] py-2 px-4 rounded-full hover:bg-white hover:text-black'>
                        Indomie Goreng Bakar
                    </button>
                </div>
            </div>
        </main>
    );
}
