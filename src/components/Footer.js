// src/components/Footer.js
'use client';

import React from 'react';

export default function Footer() {
    return (
        <footer
            style={{
                backgroundColor: '#2c3e50',
                padding: '20px',
                marginTop: '40px',
                color: '#ecf0f1',
                textAlign: 'center',
                position: 'relative',
                bottom: '0',
                width: '100%',
            }}
        >
            <p style={{ margin: '0', fontSize: '14px' }}>
                © {new Date().getFullYear()} Heitor Magalhães Lemos, Inc. Todos os direitos reservados.
            </p>
        </footer>
    );
}
