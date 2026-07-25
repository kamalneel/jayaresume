function hex(buffer) {
  return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function computeToken(secret) {
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

function safeRedirectPath(path) {
  if (typeof path === 'string' && path.startsWith('/presentations/') && !path.startsWith('//')) {
    return path;
  }
  return '/presentations/';
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const { pin, redirect } = req.body || {};
  const target = safeRedirectPath(redirect);
  const expectedPin = process.env.PRESENTATIONS_PIN;
  const secret = process.env.PRESENTATIONS_SESSION_SECRET;

  if (!expectedPin || !secret || pin !== expectedPin) {
    res.writeHead(302, {
      Location: `/presentations/login.html?error=1&redirect=${encodeURIComponent(target)}`,
    });
    res.end();
    return;
  }

  const token = await computeToken(secret);
  const maxAge = 60 * 60 * 24 * 30; // 30 days

  res.setHeader(
    'Set-Cookie',
    `presentations_auth=${token}; Path=/; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Lax`
  );
  res.writeHead(302, { Location: target });
  res.end();
}
