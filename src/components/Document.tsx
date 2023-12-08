import { h, ComponentChildren } from 'preact';
import { Body, Head, Html } from 'squid-ssr/components';
import '@/style/global.css';

type Props = {
  children: ComponentChildren;
};

export function Document({ children }: Props) {
  return <Html lang="de">
    <Head>
      <meta charSet="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <Body>
      {children}
    </Body>
  </Html>;
}