// src/app/api/delete-key/[id]/route.js

import { openDb } from '../../../../db/db';

export async function DELETE(req, { params }) {
    const { id } = params;

    try {
        const db = await openDb();
        await db.run('DELETE FROM keys WHERE id = ?', [id]);

        return new Response(
            JSON.stringify({ success: true }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Erro ao excluir a chave:', error);
        return new Response(
            JSON.stringify({ error: 'Erro ao excluir a chave.' }),
            { status: 500 }
        );
    }
}
