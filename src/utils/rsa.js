// src/utils/rsa.js
import crypto from 'crypto';

function is_prime(num) {
    if (num < 2n) return false;
    for (let i = 2n; i * i <= num; i++) {
        if (num % i === 0n) return false;
    }
    return true;
}

function generate_prime_candidate(size) {
    // Certifica-se de que 'size' seja um número inteiro
    size = Number(size);
    const min = 2n ** BigInt(size - 1);  // 'min' é BigInt
    const max = (2n ** BigInt(size)) - 1n;  // 'max' é BigInt

    // Calcula o número de bytes necessários
    const byteLength = Math.ceil(size / 8);

    // Gera bytes aleatórios
    const randomBytes = crypto.randomBytes(byteLength);

    // Converte os bytes aleatórios em BigInt
    let randomNumber = BigInt('0x' + randomBytes.toString('hex'));

    // Garante que o número esteja no intervalo [min, max]
    randomNumber = min + (randomNumber % (max - min + 1n));

    return randomNumber;
}

function generate_prime_number(size) {
    let p = 4n;
    while (!is_prime(p)) {
        p = generate_prime_candidate(size);
    }
    return p;
}

function gcd(a, b) {
    while (b !== 0n) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function modinv(a, m) {
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

export function generate_rsa_keys(size) {
    const p = generate_prime_number(size);
    const q = generate_prime_number(size);

    const n = p * q;
    const phi = (p - 1n) * (q - 1n);

    const e = 65537n;

    if (gcd(e, phi) !== 1n) {
        throw new Error('e deve ser coprimo com phi');
    }

    const d = modinv(e, phi);

    return [{ e, n }, { d, n }];
}
