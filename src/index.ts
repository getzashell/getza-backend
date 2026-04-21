import express from 'express';
const app = express();
app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.get('/healthz', (_req, res) => res.json({ ok: true }));
const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, '0.0.0.0', () => console.log('Listening on', PORT));
