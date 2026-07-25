import { next } from '@vercel/functions';

export const config = {
  matcher: ['/presentations', '/presentations/:path*'],
};

const COOKIE_NAME = 'presentations_auth';
const LOGIN_PATH = '/presentations/login.html';

function hex(buffer) {
  return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function expectedToken(secret) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, enc.encode('presentations-authorized'));
  return hex(signature);
}

function readCookie(request, name) {
  const header = request.headers.get('cookie') || '';
  for (const part of header.split(';')) {
    const eq = part.indexOf('=');
    if (eq === -1) continue;
    if (part.slice(0, eq).trim() === name) return part.slice(eq + 1).trim();
  }
  return null;
}

export default async function middleware(request) {
  const url = new URL(request.url);

  if (url.pathname === LOGIN_PATH) {
    return next();
  }

  const secret = process.env.PRESENTATIONS_SESSION_SECRET;
  const cookie = readCookie(request, COOKIE_NAME);
  const valid = Boolean(secret) && Boolean(cookie) && cookie === (await expectedToken(secret));

  if (valid) {
    return next();
  }

  const loginUrl = new URL(LOGIN_PATH, request.url);
  loginUrl.searchParams.set('redirect', url.pathname + url.search);
  return Response.redirect(loginUrl, 302);
}
