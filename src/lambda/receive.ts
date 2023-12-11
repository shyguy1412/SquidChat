import type { Request, Response, Express } from 'express';
import bodyparser from 'body-parser';
import { recieveMessageFromDatabase } from '@/lib/mongodb';
import { createServerSentEventStream } from 'squid-ssr/hooks/server';

const methods = {
  GET: (req: Request, res: Response) => _get(req, res),
  HEAD: (req: Request, res: Response) => _head(req, res),
  POST: (req: Request, res: Response) => _post(req, res),
  PUT: (req: Request, res: Response) => _put(req, res),
  DELETE: (req: Request, res: Response) => _delete(req, res),
  UPDATE: (req: Request, res: Response) => _update(req, res),
  OPTIONS: (req: Request, res: Response) => _options(req, res),
  TRACE: (req: Request, res: Response) => _trace(req, res),
};

export async function setup(app: Express) {
  app.use(bodyparser.json({ 'type': 'application/json' }));
}

export async function handler(req: Request, res: Response) {
  //Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');

  const method = req.method ?? 'GET';
  if (Object.hasOwn(methods, method))
    await methods[method as keyof typeof methods](req, res);
}

async function _get(req: Request, res: Response) {
  const sse = createServerSentEventStream(req, res);
  recieveMessageFromDatabase(message => {
    sse.send('message', message);
  });
}

async function _post(req: Request, res: Response) {
  res.status(400).send('Method does not exist for this route');
}

async function _put(req: Request, res: Response) {
  res.status(400).send('Method does not exist for this route');
}

async function _delete(req: Request, res: Response) {
  res.status(400).send('Method does not exist for this route');
}

async function _head(req: Request, res: Response<any>) {
  res.status(400).send('Method does not exist for this route');
}
async function _update(req: Request, res: Response<any>) {
  res.status(400).send('Method does not exist for this route');
}

async function _trace(req: Request, res: Response<any>) {
  res.status(400).send('Method does not exist for this route');
}

async function _options(req: Request, res: Response) {
  //CORS preflight response
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.status(204).send();
}
