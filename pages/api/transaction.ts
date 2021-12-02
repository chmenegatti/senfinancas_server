import { VercelRequest, VercelResponse } from '@vercel/node';

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
      const body = await request.body;
      response.status(200).json({
        body,
      });
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
