// src/api/encrypt/route.js
import { openDb } from '../../../db/db';

export async function POST(req) {
    const { message, e, n } = await req.json();

    if (!message || !e || !n) {
        return new Response(JSON.stringify({ error: 'Dados insuficientes para criptografia.' }), { status: 400 });
    }

    try {
        const eBigInt = BigInt(e);
        const nBigInt = BigInt(n);

        const encryptedMessage = message.split('').map(char => {
            const charCode = BigInt(char.charCodeAt(0));
            return (charCode ** eBigInt % nBigInt).toString();  // Criptografa cada caractere
        });

        return new Response(JSON.stringify({ encryptedMessage: encryptedMessage.join(',') }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Erro ao criptografar a mensagem.' }), { status: 500 });
    }
}
