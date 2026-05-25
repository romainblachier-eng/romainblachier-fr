export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const body = await req.text();
    const params = new URLSearchParams(body);
    const name = params.get('name');
    const email = params.get('email');
    const subject = params.get('subject');
    const message = params.get('message');

    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const NTFY_TOPIC = process.env.NTFY_TOPIC;
    if (NTFY_TOPIC) {
      await fetch(`https://ntfy.sh/${NTFY_TOPIC}`, {
        method: 'POST',
        headers: {
          Title: `Contact: ${subject}`,
          Tags: 'envelope',
        },
        body: `De: ${name} <${email}>\n\n${message}`,
      }).catch(() => {});
    }

    console.log('Contact form submission:', JSON.stringify({ name, email, subject, message }));

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const config = {
  path: '/api/contact',
};
