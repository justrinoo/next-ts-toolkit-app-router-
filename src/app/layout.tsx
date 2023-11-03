'use client';

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/redux/provider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [role, setRole] = useState('');

    useEffect(() => {
        const roles = localStorage.getItem('role');
        if (roles) {
            setRole(roles);
        }
    }, []);

    console.log(role);

    return (
        <html lang='en'>
            <body>
                <Providers>
                    <div
                        className={`flex w-1/2 mx-auto flex-col ${
                            role !== 'customer' ? 'mt-20' : 'mt-0'
                        }`}
                    >
                        {role !== 'customer' ? (
                            <div className='flex flex-row justify-center items-center bg-black p-5 gap-x-4 rounded text-white'>
                                <Link
                                    className='bg-white text-black font-semibold p-2 rounded'
                                    href='/dashboard'
                                >
                                    Dashboard
                                </Link>

                                <Link
                                    className='p-2 rounded'
                                    href='/master/product'
                                >
                                    Master Product
                                </Link>
                                <Link
                                    className='p-2 rounded'
                                    href='/master/product-category'
                                >
                                    Master Product Category
                                </Link>
                                <Link className='p-2 rounded' href='/transaksi'>
                                    Transaksi
                                </Link>
                            </div>
                        ) : null}
                        {children}
                    </div>
                </Providers>
            </body>
        </html>
    );
}
