// src/app/api/register-password/route.js
import { openDb } from '../../../db/db';
import crypto from 'crypto';

export async function POST(req) {
    const { password } = await req.json();
    const passwordHash = crypto.createHash('sha256').update(password).digest('hex');

    const db = await openDb();
    const result = await db.get('SELECT password_hash FROM users');

    if (result) {
        return new Response(JSON.stringify({ error: 'Senha já cadastrada.' }), { status: 400 });
    }

    await db.run('INSERT INTO users (password_hash) VALUES (?)', passwordHash);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
}
