const glow = document.querySelector('.cursor-glow');
if (glow) {
  window.addEventListener('pointermove', event => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  });
}

const form = document.querySelector('#energy-form');
const modal = document.querySelector('#success-modal');

if (form) {
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const submit = form.querySelector('button[type="submit"]');
    if (submit) submit.disabled = true;

    const data = Object.fromEntries(new FormData(form).entries());
    data.consent = form.querySelector('input[name="consent"]').checked;

    try {
      const endpoint = form.dataset.endpoint || '/api/contact';
      const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' };
      const res = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to send request');
      }

      form.reset();
      if (modal) modal.showModal();
    } catch (err) {
      alert(err.message || 'There was an error sending your request.');
    } finally {
      if (submit) submit.disabled = false;
    }
  });
}

if (modal) {
  document.querySelectorAll('.modal-close').forEach(button => {
    button.addEventListener('click', () => modal.close());
  });
}

const menuButton = document.querySelector('.menu-button');
if (menuButton) {
  const mobileNavStyle = document.createElement('style');
  mobileNavStyle.textContent = '@media (max-width: 800px) {.site-header nav.is-open { display:flex; position:absolute; top:74px; left:0; right:0; padding:20px 7vw 26px; background:var(--ink); flex-direction:column; gap:18px; border-bottom:1px solid rgba(247,247,247,.14); box-shadow:0 18px 30px rgba(0,0,0,.08);} .site-header nav.is-open a { color:var(--cream); } }';
  document.head.append(mobileNavStyle);

  menuButton.addEventListener('click', () => {
    const nav = document.querySelector('.site-header nav');
    if (!nav) return;
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('is-open', !open);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('img').forEach(img => {
    const src = img.getAttribute('src');
    const legacyLogoSources = ['suncore-logo-web.png', 'suncore-official-logo.png', 'logo final.png', 'logo.png', 'logo final.svg'];
    if (src && legacyLogoSources.includes(src)) {
      img.src = 'Logo Layer Breakdown-2.png';
      img.alt = (img.alt || '').replace(/SunCore/ig, 'Suncor');
    }
  });
});
