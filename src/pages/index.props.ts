import { Request, Response } from 'express';

export default async function getServerSideProps(req: Request, res: Response) {



  return {
    props: {}
  };
}

export type ServerSideProps = Awaited<ReturnType<typeof getServerSideProps>>['props'];