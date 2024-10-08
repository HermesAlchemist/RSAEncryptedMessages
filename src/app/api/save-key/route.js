// src/app/api/save-key/route.js

import { openDb } from '../../../db/db';

export async function POST(req) {
    const { e, n, d } = await req.json();

    try {
        const db = await openDb();
        await db.run('INSERT INTO keys (e, n, d) VALUES (?, ?, ?)', [e, n, d]);

        return new Response(
            JSON.stringify({ success: true }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Erro ao salvar a chave:', error);
        return new Response(
            JSON.stringify({ error: 'Erro ao salvar a chave.' }),
            { status: 500 }
        );
    }
}
