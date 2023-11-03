'use client';

import { useAppDispatch } from '@/redux/hooks';
import { useAddLoginMutation } from '@/redux/services/loginApi';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useState } from 'react';

interface LoginProps {
    username: string;
    password: string;
}

export default function LayoutFormItems() {
    const router = useRouter();

    const [auth, setAuth] = useState<LoginProps>({
        username: '',
        password: '',
    });
    const [addLogin, { error, data, status, reset }] = useAddLoginMutation();

    const onChangeInputTexxt: React.ChangeEventHandler<HTMLInputElement> = (
        e
    ) => {
        setAuth({ ...auth, [e.target.name]: e.target.value });
    };

    return (
        <React.Fragment>
            <h4 className='text-xl font-semibold text-center'>Login</h4>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    addLogin(auth);
                    if (status === 'uninitialized') {
                        reset();
                        setAuth({
                            username: '',
                            password: '',
                        });
                    } else if (status === 'fulfilled') {
                        localStorage.setItem('role', data?.data?.user.roles);
                        localStorage.setItem('token', data?.data?.token);
                        if (data.data.user.roles === 'administrator') {
                            return router.push('/dashboard');
                        } else {
                            return router.push('/app');
                        }
                    }
                }}
            >
                <div className='py-2 mt-3 mb-3'>
                    <label>Username</label>
                    <input
                        className='w-full py-2 px-4 outline-none rounded-md mt-2 mb-2 border-2 border-gray-600'
                        type='text'
                        name='username'
                        autoComplete='off'
                        onChange={onChangeInputTexxt}
                        value={auth.username}
                        placeholder='Masukan Username...'
                    />
                </div>
                <div className='py-2 mt-3 mb-3'>
                    <label>Password</label>
                    <input
                        className='w-full py-2 px-4 outline-none rounded-md mt-2 mb-2 border-2 border-gray-600'
                        type='password'
                        name='password'
                        autoComplete='off'
                        value={auth.password}
                        onChange={onChangeInputTexxt}
                        placeholder='Masukan Password...'
                    />
                </div>
                <p className='text-center mb-2 text-red-600'>
                    {error?.data?.message}
                </p>
                <button
                    type='submit'
                    className='py-2 bg-black w-full rounded-md text-white font-semibold'
                >
                    Submit
                </button>
            </form>
        </React.Fragment>
    );
}
