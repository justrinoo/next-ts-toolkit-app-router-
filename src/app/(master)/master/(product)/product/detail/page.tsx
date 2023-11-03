import React from 'react';

export default function DetailProductCategory() {
    return (
        <div className='relative bg-white flex flex-col justify-between items-center gap-x-0 rounded py-2 px-5 mt-8 shadow shadow-black'>
            <div className='absolute -top-4 left-0 bg-orange-300 text-white font-semibold px-3 rounded'>
                Makanan
            </div>
            <div className='absolute right-0 -bottom-2 px-4 rounded bg-green-600 text-white font-semibold'>
                Aktif
            </div>
            <div className='flex flex-col gap-y-2'>
                <span className='text-gray-600'>PDCT00008</span>
                <h2 className='text-md font-semibold'>Cheetos</h2>
                <h2>Rp.50.000</h2>
            </div>
            <div>
                <img
                    className='w-2/4 h-2/4 mx-auto'
                    src='https://down-id.img.susercontent.com/file/bce5dd011155a7080eec005410c07756'
                    alt='Cheetos'
                />
            </div>
        </div>
    );
}
