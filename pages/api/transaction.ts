import { VercelRequest, VercelResponse } from '@vercel/node';
import { Db, MongoClient } from 'mongodb';

let cachedDb: Db | undefined;

async function connectToDatabase(uri: string) {
  if (cachedDb) {
    return cachedDb;
  }

  const dataBaseClient = await MongoClient.connect(uri, {});

  const dataBaseName = 'sensedata';

  const dataBase = dataBaseClient.db(dataBaseName);

  cachedDb = dataBase;

  return dataBase;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (request: VercelRequest, response: VercelResponse) => {
  const { method } = request;

  switch (method) {
    case 'GET':
      response.status(200).json({
        message: 'Hello World - Metodo GET',
      });
      break;
    case 'POST':
      const body = request.body;

      const dataBase = await connectToDatabase(process.env.MONGODB_URI || '');

      const collection = dataBase.collection('transactions');

      const result = await collection.insertOne(body);

      response.status(200).json({ result });

      break;
    case 'PUT':
      response.status(200).json({
        message: 'Hello World - Metodo PUT',
      });
      break;
    case 'DELETE':
      response.status(200).json({
        message: 'Hello World - Metodo DELETE',
      });
      break;
    default:
      response.status(400).json({
        message: 'Hello World - Metodo desconhecido',
      });
      break;
  }
};
