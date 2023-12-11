import bodyParser from 'body-parser';
import express from 'express';
import { squid } from 'squid-ssr';
import pages from 'squid-ssr/pages';
import "@/lib/mongodb";

const port = Number.parseInt(process.env.SQUID_PORT ?? '0') || 3000;
const app = express();

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable('x-powered-by');

app.use(bodyParser.json({ type: 'application/json' }));
app.use(squid(pages));

app.get('*', (_req, res) => {
  res.status(404).send('Page not found');
});

app.listen(port, () => {
  console.log(`✅ Express server listening on port ${port}`);
});