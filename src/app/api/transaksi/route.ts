import { NextRequest, NextResponse } from 'next/server';
import { connection } from '../../../config/db';

export async function GET() {
    try {
        const results = await connection.query(
            'SELECT * FROM transaction INNER JOIN transactionDetail ON transaction.id = transactionDetail.transaction_id'
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

export async function POST(request: NextRequest) {
    function generateFormattedCode(index: number) {
        const prefix = 'TSID';
        const paddingLength = 8;
        const indexStr = String(index).padStart(paddingLength, '0');
        return `${prefix}${indexStr}`;
    }

    const nextIndex = await getNextIndexFromDatabase();
    const plu = generateFormattedCode(nextIndex);

    try {
        const {
            transaction_no,
            active,
            created_user,
            product_variant_id,
            price,
            qty,
            created_date,
            updated_user,
            updated_date,
        } = await request.json();
        // Mengecek apakah data dengan PLU yang sama sudah ada di database
        const existingProduct = await getProductByName(transaction_no);
        if (existingProduct) {
            // Jika data dengan PLU yang sama sudah ada, kirim respons kesalahan
            return NextResponse.json(
                {
                    message: 'Duplikat transaksi!',
                    status: 400,
                },
                { status: 400 }
            );
        }
        let formatCreatedUser = created_user.toUpperCase();
        const transaction: any = await connection.query(
            'INSERT INTO transaction SET ?',
            {
                transaction_no: plu,
                total_amount: price,
                active,
                created_user: formatCreatedUser,
                created_date,
                updated_user,
                updated_date,
            }
        );

        const invoice: any = await connection.query(
            'INSERT INTO transactionDetail SET ?',
            {
                transaction_id: transaction.insertId,
                product_variant_id,
                price,
                qty,
                subtotal: price * qty,
                active,
                created_user: formatCreatedUser,
                created_date,
                updated_user,
                updated_date,
            }
        );

        return NextResponse.json({
            id: transaction.insertId,
            transaction_no: plu,
            active,
            created_user: formatCreatedUser,
            created_date,
            updated_user,
            updated_date,
        });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json(
            { message: error.message },
            {
                status: 500,
            }
        );
    }
}

async function getProductByName(transaction_no: string) {
    const result: any = await connection.query(
        'SELECT * FROM transaction WHERE transaction_no = ?',
        [transaction_no]
    );
    return result[0];
}

async function getNextIndexFromDatabase() {
    const maxIdQueryResult: any = await connection.query(
        'SELECT MAX(id) as max_id FROM transaction'
    );
    const maxId = maxIdQueryResult[0].max_id || 0;
    return maxId + 1;
}
