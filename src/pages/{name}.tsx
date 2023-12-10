import type { ServerSideProps } from '@/pages/{name}.props';
import { h } from 'preact';
import { Document } from '@/components/Document';
import { Body, Head } from 'squid-ssr/components';
import { Chat } from '@/components/Chat';

export default function App({ name }: ServerSideProps) {

  return <Document>
    <Head>
      <title>My first Squid!</title>
    </Head>
    <Body>
      <Chat name={name}></Chat>
    </Body>
  </Document>;

}