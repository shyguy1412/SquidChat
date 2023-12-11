import { MongoClient } from "mongodb";
import "@env";
// Replace the uri string with your connection string.
const {
  MONGO_USER,
  MONGO_PASS,
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DATABASE
} = process.env;

const uri = `mongodb://${MONGO_HOST}:${MONGO_PORT}`;
// const client = new MongoClient(uri, {directConnection: true});
const client = new MongoClient(uri, { replicaSet: 'rs0' });
const database = client.db(MONGO_DATABASE);

export async function sendMessageToDatabase(message: { message: string, sender: string; }) {
  const messages = database.collection('messages');
  return messages.insertOne(message);
}

export async function recieveMessageFromDatabase(cb: (message: { message: string, sender: string; }) => void) {
  const messages = database.collection('messages');
  messages.watch(undefined, { fullDocument: 'required' }).on('change', ({ fullDocument }: any) => cb(fullDocument));
} 