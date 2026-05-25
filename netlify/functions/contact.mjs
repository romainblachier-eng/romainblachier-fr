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

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (RESEND_API_KEY) {
      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Formulaire Contact <onboarding@resend.dev>',
          to: 'romain.blachier@gmail.com',
          reply_to: email,
          subject: `[romainblachier.fr] ${subject}`,
          text: `Nouveau message via le formulaire de contact\n\nDe : ${name} <${email}>\nSujet : ${subject}\n\n${message}`,
        }),
      });

      if (!emailRes.ok) {
        console.error('Resend error:', await emailRes.text());
      }
    }

    console.log('Contact form submission:', JSON.stringify({ name, email, subject, message }));

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Function error:', err);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const config = {
  path: '/api/contact',
};
