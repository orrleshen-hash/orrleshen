// ====== SETTINGS ======
// Quick contact form: opens WhatsApp with the message pre-filled.
// To send by email instead, set CONTACT_MODE = 'email'.
const CONTACT_MODE = 'whatsapp'; // 'whatsapp' | 'email'
const WHATSAPP_NUMBER = '972502076069';
const CONTACT_EMAIL = 'orrleshen@gmail.com';
// =======================

const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = (data.get('name') || '').trim();
  const phone = (data.get('phone') || '').trim();
  const message = (data.get('message') || '').trim();

  let ok = true;
  form.querySelectorAll('input,textarea').forEach((el) => {
    const bad = !el.value.trim();
    el.classList.toggle('err', bad);
    if (bad) ok = false;
  });
  if (!ok) {
    statusEl.textContent = 'נא למלא את כל השדות.';
    return;
  }

  const text = `שלום, פנייה מהאתר של אור לשן\nשם: ${name}\nטלפון: ${phone}\nהודעה: ${message}`;
  const url = CONTACT_MODE === 'email'
    ? `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('פנייה מהאתר - ' + name)}&body=${encodeURIComponent(text)}`
    : `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

  statusEl.textContent = 'תודה! מעבירים אתכם לשליחת ההודעה...';
  window.open(url, '_blank', 'noopener');
  form.reset();
});

form.addEventListener('input', (e) => e.target.classList.remove('err'));
