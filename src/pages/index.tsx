import type { ServerSideProps } from '@/pages/index.props';
import { h } from 'preact';
import { Document } from '@/components/Document';
import { Body, Head } from 'squid-ssr/components';
import { useRef } from 'preact/hooks';

export default function App({ }: ServerSideProps) {

  const inputRef = useRef<HTMLInputElement>(null);

  return <Document>
    <Head>
      <title>New Page</title>
    </Head>
    <Body>
      <span>
        <input ref={inputRef} type="text" />
        <button onClick={() => window.location.assign(`/${inputRef.current?.value}`)}
        >Login</button>
      </span>
    </Body>
  </Document>;

}