import { Inter } from 'next/font/google';
import LayoutFormItems from './LayoutFormItems';
const inter = Inter({ subsets: ['latin'] });

export default function RootLayoutLogin({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <head>
                <title>Login</title>
            </head>
            <body className={inter.className}>
                <main className='flex justify-center flex-col items-center min-h-screen'>
                    <div className='bg-white text-black p-5 rounded-lg w-[500px] h-96'>
                        <LayoutFormItems />
                    </div>
                </main>
            </body>
        </html>
    );
}
