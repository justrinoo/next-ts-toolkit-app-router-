import { NextRequest, NextResponse } from 'next/server';
import { connection } from '../../../config/db';

export async function GET() {
    try {
        const results = await connection.query('SELECT * FROM product');
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
    function generateFormattedCode(index: number) {
        const prefix = 'PDCT';
        const paddingLength = 8;
        const indexStr = String(index).padStart(paddingLength, '0');
        return `${prefix}${indexStr}`;
    }

    const nextIndex = await getNextIndexFromDatabase();
    const plu = generateFormattedCode(nextIndex);

    try {
        const { name, product_category_id, active } = await request.json();
        // Mengecek apakah data dengan PLU yang sama sudah ada di database
        const existingProduct = await getProductByName(name);
        if (existingProduct) {
            // Jika data dengan PLU yang sama sudah ada, kirim respons kesalahan
            return NextResponse.json(
                {
                    message:
                        'Data dengan Nama Produk yang sama sudah ada di database.',
                    status: 400,
                },
                { status: 400 }
            );
        }
        const result: any = await connection.query(
            'INSERT INTO product SET ?',
            {
                plu,
                name,
                product_category_id,
                active: 'true',
                created_user: 'Operator',
            }
        );

        return NextResponse.json({
            name,
            product_category_id,
            active: true,
            id: result.insertId,
            plu,
            created_user: 'Operator',
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
        'SELECT * FROM product WHERE name = ?',
        [name]
    );
    return result[0];
}

async function getNextIndexFromDatabase() {
    const maxIdQueryResult: any = await connection.query(
        'SELECT MAX(id) as max_id FROM product'
    );
    const maxId = maxIdQueryResult[0].max_id || 0;
    return maxId + 1;
}
