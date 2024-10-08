// src/db/db.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function openDb() {
    return open({
        filename: './rsa_db.sqlite',
        driver: sqlite3.Database,
    });
}

// Criação da tabela de chaves e usuários (se não existir)
export async function createTables() {
    const db = await openDb();
    await db.exec(`
        CREATE TABLE IF NOT EXISTS keys (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            e TEXT,
            n TEXT,
            d TEXT
        );
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            password_hash TEXT
        );
    `);
}
