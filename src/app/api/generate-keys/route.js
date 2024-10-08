// src/app/api/generate-keys/route.js

import { openDb } from '../../../db/db';
import { generate_rsa_keys } from '../../../utils/rsa';

export async function POST(req) {
    const { size } = await req.json();
    console.log('Tamanho da chave solicitado:', size);

    try {
        const [publicKey, privateKey] = generate_rsa_keys(size);

        const db = await openDb();
        await db.run('INSERT INTO keys (e, n, d) VALUES (?, ?, ?)', [
            publicKey.e.toString(),
            publicKey.n.toString(),
            privateKey.d.toString()
        ]);

        // Converte os valores BigInt para strings antes de enviar a resposta
        const publicKeyString = {
            e: publicKey.e.toString(),
            n: publicKey.n.toString(),
        };
        const privateKeyString = {
            d: privateKey.d.toString(),
            n: privateKey.n.toString(),
        };

        return new Response(
            JSON.stringify({ publicKey: publicKeyString, privateKey: privateKeyString }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Erro ao gerar chaves:', error);
        return new Response(
            JSON.stringify({ error: 'Erro ao gerar chaves.' }),
            { status: 500 }
        );
    }
}
