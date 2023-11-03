'use client';
import { useGetProductQuery } from '@/redux/services/productApi';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

export default function Product() {
    const { data } = useGetProductQuery(null);
    const pathname = usePathname();
    const router = useRouter();
    return (
        <>
            <div className='flex justify-start'>
                <button
                    onClick={() => router.push(`${pathname}/create`)}
                    className='border-2 border-black w-[20%] mt-5 py-2 hover:bg-black hover:text-white rounded'
                >
                    Create Product
                </button>
            </div>
            <div className='grid grid-cols-3 gap-6'>
                {data && data.length > 0
                    ? data.map((product, idx) => (
                          <div
                              key={idx}
                              className='relative bg-white flex justify-between items-start gap-x-0 rounded py-2 px-5 mt-8 shadow shadow-black'
                          >
                              <div
                                  className={`absolute right-0 -bottom-2 px-4 rounded ${
                                      product.active === 'true'
                                          ? 'bg-green-600'
                                          : 'bg-red-600'
                                  } text-white font-semibold`}
                              >
                                  {product.active === 'true'
                                      ? 'Active'
                                      : 'Not Active'}
                              </div>
                              <div className='flex flex-col gap-y-2'>
                                  <span className='text-gray-600'>
                                      {product.plu}
                                  </span>
                                  <span className='text-gray-600'>
                                      {product.name}
                                  </span>
                                  <span className='text-gray-600'>
                                      Pembuat: {product.created_user}
                                  </span>
                                  <div className='flex items-center gap-x-2 cursor-pointer mt-4'>
                                      <span
                                          onClick={() =>
                                              router.push(`${pathname}/detail`)
                                          }
                                          className='text-sm'
                                      >
                                          Detail
                                      </span>
                                      <span
                                          onClick={() =>
                                              router.push(`${pathname}/edit/20`)
                                          }
                                          className='text-sm'
                                      >
                                          Edit
                                      </span>
                                      <span
                                          onClick={() => {
                                              if (confirm('Yakin mau apus?')) {
                                                  console.log('oke');
                                              } else {
                                                  console.log('engga');
                                              }
                                          }}
                                          className='text-sm'
                                      >
                                          Delete
                                      </span>
                                  </div>
                              </div>
                          </div>
                      ))
                    : null}
            </div>
        </>
    );
}
