import { NextApiRequest, NextApiResponse } from 'next';

import serverAuth from '@/libs/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { currentUser } = await serverAuth(req, res);

    return res.status(200).json(currentUser); // ✅
  } catch (error) {
    return res.status(401).json({ error: "Not signed in" });
  }
}