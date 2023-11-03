import { NextRequest, NextResponse } from 'next/server';
import { connection } from '../../../config/db';

export async function GET() {
    try {
        const results = await connection.query('SELECT * FROM productCategory');
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

export async function POST(request: NextRequest) {
    try {
        const { name, active } = await request.json();
        const existingProduct = await getProductByName(name);
        if (existingProduct) {
            return NextResponse.json(
                {
                    message:
                        'Data dengan Nama Produk Category yang sama sudah ada di database.',
                    status: 400,
                },
                { status: 400 }
            );
        }
        const result: any = await connection.query(
            'INSERT INTO productCategory SET ?',
            {
                name,
                active,
                created_user: 'Operator',
            }
        );

        return NextResponse.json({
            name,
            active,
            created_user: 'Operator',
            id: result.insertId,
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

async function getProductByName(name: string) {
    const result: any = await connection.query(
        'SELECT * FROM productCategory WHERE name = ?',
        [name]
    );
    return result[0];
}
