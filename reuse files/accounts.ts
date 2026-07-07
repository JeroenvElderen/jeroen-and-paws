import type { NextApiRequest, NextApiResponse } from 'next';
import { revolutBusinessGet } from '../utils/revolut-business';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await revolutBusinessGet('/api/1.0/accounts');
    return res.status(200).json(data);
  } catch (error: unknown) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Revolut accounts failed'
    });
  }
}
