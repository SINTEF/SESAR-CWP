/**
 * TypeScript declarations for the obfuscated password store.
 * This module provides encrypted password persistence using IndexedDB and Web Crypto.
 */

/**
 * Persist an encrypted password to IndexedDB.
 * @param password - The password to encrypt and store
 * @param salt - A unique salt for key derivation (e.g., `sesar-1280e-${username}-${brokerUrl}`)
 * @returns Promise that resolves when the password is persisted
 */
export function persist(password: string, salt: string): Promise<void>;

/**
 * Load and decrypt a password from IndexedDB.
 * @param salt - The same salt used when persisting the password
 * @returns Promise that resolves to the decrypted password, or undefined if not found
 */
export function load(salt: string): Promise<string | undefined>;
