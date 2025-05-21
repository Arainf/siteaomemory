import type { NextApiRequest, NextApiResponse } from 'next'
const cloudinary = require('../../utils/cloudinary')

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { folder } = req.query
  if (!folder || typeof folder !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid folder parameter' })
  }

  try {
    const result = await cloudinary.search
      .expression(`folder:${folder}/*`)
      .sort_by('public_id', 'desc')
      .max_results(400)
      .execute()

    // Return only the resources array
    res.status(200).json(result.resources)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch images', details: error.message })
  }
}
