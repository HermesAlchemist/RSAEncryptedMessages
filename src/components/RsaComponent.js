// src/components/RsaComponent.js
'use client';

import { useState } from 'react';

function modInv(a, m) {
    let m0 = m;
    let x0 = 0n;
    let x1 = 1n;

    if (m === 1n) return 0n;

    while (a > 1n) {
        let q = a / m;
        let t = m;
        m = a % m;
        a = t;
        t = x0;
        x0 = x1 - q * x0;
        x1 = t;
    }

    if (x1 < 0n) x1 += m0;
    return x1;
}

export default function RsaComponent() {
    const [cipherText, setCipherText] = useState('');
    const [privateKeyD, setPrivateKeyD] = useState('');
    const [privateKeyN, setPrivateKeyN] = useState('');
    const [decryptedMessage, setDecryptedMessage] = useState('');

    const handleDecrypt = () => {
        const cipherArray = cipherText.split(',').map(Number);
        const d = BigInt(privateKeyD);
        const n = BigInt(privateKeyN);

        const decryptedMessageArray = cipherArray.map(c =>
            String.fromCharCode(Number((BigInt(c) ** d) % n))
        );

        setDecryptedMessage(decryptedMessageArray.join(''));
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Descriptografia RSA</h1>

            <label style={{ display: 'block', marginBottom: '10px', color: '#555' }}>
                Mensagem Criptografada (separada por vírgulas):
                <input
                    type="text"
                    value={cipherText}
                    onChange={(e) => setCipherText(e.target.value)}
                    placeholder="Ex: 1234, 5678, 9012"
                    style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ddd' }}
                />
            </label>

            <label style={{ display: 'block', marginBottom: '10px', color: '#555' }}>
                Chave Privada (d):
                <input
                    type="text"
                    value={privateKeyD}
                    onChange={(e) => setPrivateKeyD(e.target.value)}
                    placeholder="Ex: 9473"
                    style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ddd' }}
                />
            </label>

            <label style={{ display: 'block', marginBottom: '10px', color: '#555' }}>
                Chave Privada (n):
                <input
                    type="text"
                    value={privateKeyN}
                    onChange={(e) => setPrivateKeyN(e.target.value)}
                    placeholder="Ex: 56153"
                    style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ddd' }}
                />
            </label>

            <button
                onClick={handleDecrypt}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#4CAF50',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    width: '100%',
                    marginTop: '15px'
                }}
            >
                Descriptografar
            </button>

            {decryptedMessage && (
                <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#e7f4e4', borderRadius: '5px', border: '1px solid #c7e1c7' }}>
                    <strong>Mensagem Descriptografada:</strong> {decryptedMessage}
                </div>
            )}
        </div>
    );
}
