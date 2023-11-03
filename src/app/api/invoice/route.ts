import { NextRequest, NextResponse } from 'next/server';
import { connection } from '../../../config/db';

export async function GET() {
    try {
        const results = await connection.query(
            'SELECT * FROM transactionDetail'
        );
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
