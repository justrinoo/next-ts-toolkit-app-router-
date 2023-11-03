import { NextRequest, NextResponse } from 'next/server';
import { connection } from '../../../../config/db';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
    const { username, password, roles } = await request.json();
    try {
        const token = await jwt.sign(
            { exp: Math.floor(Date.now() / 1000) + 60 * 60, data: password },
            'NEXT_SERVET_JWT_SECRET'
        );
        const results = await connection.query('INSERT INTO user SET ?', {
            username,
            password,
            roles,
            token,
        });
        return NextResponse.json(results);
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message },
            {
                status: 500,
            }
        );
    }
}
