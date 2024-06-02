import { Buffer } from 'buffer';

// @ts-ignore
window.Buffer = Buffer;

export const parseJwt = (token: string): { [key: string]: any } | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = Buffer.from(base64, 'base64').toString('utf-8');

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to parse JWT', error);
    return null;
  }
};