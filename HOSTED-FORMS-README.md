Hosted form setup (Formspree)

I added a configurable `data-endpoint` attribute to the contact form so you can wire a hosted form service without running a backend.

Quick steps (Formspree - recommended):

1. Create a free account at https://formspree.io and create a new form. Provide `info@suncoreenergy.au` as the recipient when prompted.
2. Formspree will give you a form endpoint like `https://formspree.io/f/abcd1234`.
3. I have already set the form endpoint to your provided URL `https://formspree.io/f/mzepozyw` in `index.html`.

Example (already applied):

<form id="energy-form" data-endpoint="https://formspree.io/f/mzepozyw">...

4. Save and upload the site (or run locally). Submissions will be forwarded to `info@suncoreenergy.au` by Formspree.

Testing locally:
- If you're serving the site at `http://localhost:8000`, submit the form in your browser and check `info@suncoreenergy.au` for the forwarded message.
- Or test with `curl` from the terminal (replace sample values):

```bash
curl -X POST https://formspree.io/f/mzepozyw \
	-H "Accept: application/json" \
	-H "Content-Type: application/json" \
	-d '{"name":"Test User","email":"test@example.com","phone":"0400000000","planning":"My home","postcode":"3000","bill":"Under $150","consent":true}'
```

Alternatives:
- Getform, Formcarry, Formspark: similar steps, sign up and replace `data-endpoint` with their endpoint.

If you want, I can:
- Walk you through creating the Formspree form and paste the endpoint here, or
- Configure a different provider you prefer.
