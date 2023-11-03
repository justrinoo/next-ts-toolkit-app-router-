import { NextRequest, NextResponse } from 'next/server';
import { connection } from '../../../config/db';

export async function GET() {
    try {
        const results: any = await connection.query(
            'SELECT * FROM productVariant'
        );
        for (const data of results) {
            delete data.image_location;
        }
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
        const {
            product_id,
            name,
            image_location,
            qty,
            price,
            active,
            created_user,
        } = await request.json();
        const nextIndex = await getNextIndexFromDatabase();
        const formatCodeProductVariant = generateFormattedCode(2, nextIndex);
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
        let formatCreatedUser = created_user.toUpperCase();
        const result: any = await connection.query(
            'INSERT INTO productVariant SET ?',
            {
                product_id,
                code: formatCodeProductVariant,
                name,
                image_location,
                qty,
                price,
                active,
                created_user: formatCreatedUser,
            }
        );

        return NextResponse.json({
            id: result.insertId,
            product_id,
            code: formatCodeProductVariant,
            name,
            qty,
            price,
            active,
            created_user: formatCreatedUser,
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
        'SELECT * FROM productVariant WHERE name = ?',
        [name]
    );
    return result[0];
}

async function getNextIndexFromDatabase() {
    const maxIdQueryResult: any = await connection.query(
        'SELECT MAX(id) as max_id FROM productVariant'
    );
    const maxId = maxIdQueryResult[0].max_id || 0;
    return maxId + 1;
}

function generateFormattedCode(productId: number, nextIndex: number) {
    const prefix = 'PDCT';
    const paddingLength = 7;
    const indexStr = `${String(productId).padStart(paddingLength, '0')}${String(
        nextIndex
    ).padStart(5, '0')}`;
    return `${prefix}${indexStr}`;
}
