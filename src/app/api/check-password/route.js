// src/app/api/check-password/route.js
import { openDb } from '../../../db/db';

export async function GET() {
    const db = await openDb();
    const result = await db.get('SELECT password_hash FROM users');

    if (result) {
        return new Response(JSON.stringify({ hasPassword: true }), { status: 200 });
    } else {
        return new Response(JSON.stringify({ hasPassword: false }), { status: 200 });
    }
}
