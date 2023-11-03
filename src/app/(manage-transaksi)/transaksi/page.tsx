import React from 'react';

export default function ManageTransaksi() {
    return (
        <div className='relative overflow-x-auto mt-5'>
            <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                        <th scope='col' className='px-6 py-3'>
                            Nomor Transaksi
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Produk Variant
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Produk
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Qty
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Price
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Pembeli
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Date
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                        <th
                            scope='row'
                            className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                        >
                            Apple MacBook Pro 17"
                        </th>
                        <td className='px-6 py-4'>Silver</td>
                        <td className='px-6 py-4'>Laptop</td>
                        <td className='px-6 py-4'>$2999</td>
                        <td className='px-6 py-4'>$2999</td>
                        <td className='px-6 py-4'>$2999</td>
                        <td className='px-6 py-4'>$2999</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
