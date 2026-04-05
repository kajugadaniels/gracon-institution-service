import * as crypto from 'crypto';

export function deriveInstitutionKey(
  masterSecret: string,
  institutionId: string,
): Buffer {
  return crypto
    .createHmac('sha256', masterSecret)
    .update(institutionId)
    .digest();
}

export function encryptInstitutionPrivateKey(
  pem: string,
  derivedKey: Buffer,
): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', derivedKey, iv);
  const encrypted = Buffer.concat([cipher.update(pem, 'utf8'), cipher.final()]);
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

export function decryptInstitutionPrivateKey(
  encrypted: string,
  derivedKey: Buffer,
): string {
  const [ivHex, encHex] = encrypted.split(':');
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    derivedKey,
    Buffer.from(ivHex, 'hex'),
  );
  return Buffer.concat([
    decipher.update(Buffer.from(encHex, 'hex')),
    decipher.final(),
  ]).toString('utf8');
}

export function fingerprintPublicKey(pem: string): string {
  return crypto.createHash('sha256').update(pem).digest('hex');
}
