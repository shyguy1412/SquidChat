import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { useServerSentEvents } from "squid-ssr/hooks/client";
// import { send } from "squid-ssr/lambda";
// import { receiveUrl } from "squid-ssr/lambda";
import { apiV0MongoSend as send } from "squid-ssr/api";
import { apiV0MongoReceiveUrl as receiveUrl } from "squid-ssr/api";

type Props = {
  name: string;
};

export function Chat({ name }: Props) {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ message: string, sender: string; }[]>([]);

  const sse = useServerSentEvents(receiveUrl);

  useEffect(() => {
    if (!sse) return;
    sse.addEventListener('message', ({ detail: message }) => {
      setChatHistory((chatHistory) => {
        return [...chatHistory, message];
      });
    });

  }, [sse]);

  return <div>
    <div>
      {chatHistory
        .map(({ message, sender }) => <div>{sender}: {message}</div>)}
    </div>
    <span>
      <input type="text" value={message} onChange={({ currentTarget: { value } }) => setMessage(value)} />
      <button onClick={() => send({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message,
          sender: name
        })
      }).then(r => setMessage(''))}
      >Send</button>
    </span>
  </div>;
};