// src/app/api/list-keys/route.js

import { openDb } from '../../../db/db';

export async function GET() {
    try {
        const db = await openDb();
        const keys = await db.all('SELECT id, e, n, d FROM keys');

        return new Response(
            JSON.stringify({ keys }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Erro ao listar chaves:', error);
        return new Response(
            JSON.stringify({ error: 'Erro ao listar chaves.' }),
            { status: 500 }
        );
    }
}
