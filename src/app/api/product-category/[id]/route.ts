import { NextRequest, NextResponse } from 'next/server';
import { connection } from 'src/config/db';

export async function GET(request: NextRequest, { params }: any) {
    try {
        const result: any = await connection.query(
            'SELECT * FROM productCategory WHERE id = ?',
            [params.id]
        );
        if (result.length === 0) {
            return NextResponse.json(
                {
                    message: 'Produk tidak ditemukan!',
                    status: 400,
                },
                { status: 400 }
            );
        }
        return NextResponse.json(result[0]);
    } catch (error: any) {
        return NextResponse.json({ message: error.message });
    }
}

export async function DELETE(request: NextRequest, { params }: any) {
    try {
        const result: any = await connection.query(
            'SELECT * FROM productCategory WHERE id = ?',
            [params.id]
        );
        if (result.length === 0) {
            return NextResponse.json(
                {
                    message: 'Produk tidak ditemukan!',
                    status: 400,
                },
                { status: 400 }
            );
        }
        await connection.query('DELETE FROM productCategory WHERE id = ?', [
            params.id,
        ]);
        return NextResponse.json({
            message: 'Produk berhasil di hapus!',
            status: 200,
        });
    } catch (error: any) {
        return NextResponse.json({ message: error.message });
    }
}

export async function PATCH(request: NextRequest, { params }: any) {
    const data = await request.json();
    try {
        const productById: any = await connection.query(
            'SELECT * FROM productCategory WHERE id = ?',
            [params.id]
        );

        if (productById.length === 0) {
            return NextResponse.json(
                {
                    message: 'Produk tidak ditemukan!',
                    status: 400,
                },
                { status: 400 }
            );
        } else {
            await connection.query(
                'UPDATE productCategory SET ? WHERE id = ?',
                [data, params.id]
            );
            return NextResponse.json({
                ...data,
                id: params.id,
            });
        }
    } catch (error: any) {
        return NextResponse.json({ message: error.message });
    }
}
