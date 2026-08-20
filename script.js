const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', event => { glow.style.left = `${event.clientX}px`; glow.style.top = `${event.clientY}px`; });
const form = document.querySelector('#energy-form');
const modal = document.querySelector('#success-modal');
form.addEventListener('submit', async event => {
	event.preventDefault();
	const submit = form.querySelector('button[type="submit"]');
	submit.disabled = true;
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
		modal.showModal();
	} catch (err) {
		alert(err.message || 'There was an error sending your request.');
	} finally {
		submit.disabled = false;
	}
});
document.querySelectorAll('.modal-close').forEach(button => button.addEventListener('click', () => modal.close()));
const menuButton = document.querySelector('.menu-button');
const mobileNavStyle = document.createElement('style');
mobileNavStyle.textContent = '@media (max-width: 800px) {.site-header nav.is-open { display:flex; position:absolute; top:73px; left:0; width:100%; padding:26px 7vw; background:var(--cream); flex-direction:column; gap:20px; border-bottom:1px solid var(--line); }}';
document.head.append(mobileNavStyle);
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') === 'true'; menuButton.setAttribute('aria-expanded', String(!open)); document.querySelector('.site-header nav').classList.toggle('is-open', !open); });
