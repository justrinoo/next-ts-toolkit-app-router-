import { NextRequest, NextResponse } from 'next/server';
import { connection } from '../../../../config/db';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
    const { username, password } = await request.json();

    try {
        const results: any = await connection.query(
            'SELECT * FROM user WHERE username = ?',
            [username]
        );
        if (results.length === 0) {
            return NextResponse.json(
                {
                    message: 'Akun tidak di temukan!',
                    status: 400,
                },
                {
                    status: 400,
                }
            );
        }
        console.log(results);
        delete results[0].token;
        const token = await jwt.sign(
            { exp: Math.floor(Date.now() / 1000) + 60 * 60, data: password },
            'NEXT_SERVET_JWT_SECRET'
        );
        return NextResponse.json({
            data: {
                user: results[0],
                token,
            },
        });
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            {
                status: 500,
            }
        );
    }
}
