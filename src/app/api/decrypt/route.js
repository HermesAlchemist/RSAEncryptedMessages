// src/api/decrypt/route.js
import { openDb } from '../../../db/db';

export async function POST(req) {
    const { encryptedMessage, d, n } = await req.json();

    if (!encryptedMessage || !d || !n) {
        return new Response(JSON.stringify({ error: 'Dados insuficientes para descriptografia.' }), { status: 400 });
    }

    try {
        const dBigInt = BigInt(d);
        const nBigInt = BigInt(n);

        const decryptedMessage = encryptedMessage.split(',').map(c => {
            const charCode = (BigInt(c) ** dBigInt % nBigInt);
            return String.fromCharCode(Number(charCode));
        });

        return new Response(JSON.stringify({ decryptedMessage: decryptedMessage.join('') }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Erro ao descriptografar a mensagem.' }), { status: 500 });
    }
}
