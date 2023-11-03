'use client';
import { useGetProductCategoryQuery } from '@/redux/services/productCategoryApi';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

export default function ProductCategory() {
    const { data } = useGetProductCategoryQuery(null);
    const pathname = usePathname();
    const router = useRouter();
    return (
        <>
            <div className='flex justify-start'>
                <button
                    onClick={() => router.push(`${pathname}/create`)}
                    className='border-2 border-black w-[30%] mt-5 py-2 hover:bg-black hover:text-white rounded'
                >
                    Create Product Category
                </button>
            </div>
            <div className='grid grid-cols-3 gap-6'>
                {data && data.length > 0
                    ? data.map((category, idx) => (
                          <div
                              key={idx}
                              className='relative bg-white flex justify-between items-start gap-x-0 rounded py-2 px-5 mt-8 shadow shadow-black'
                          >
                              <div
                                  className={`absolute right-0 -bottom-2 px-4 rounded ${
                                      category.active === 'true'
                                          ? 'bg-green-600'
                                          : 'bg-red-600'
                                  } text-white font-semibold`}
                              >
                                  {category.active === 'true'
                                      ? 'Active'
                                      : 'Not Active'}
                              </div>
                              <div className='flex flex-col gap-y-2'>
                                  <h2 className='text-md font-semibold'>
                                      {category.name}
                                  </h2>
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
