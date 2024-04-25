import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { assistantId, customerId } = req.body

  const createdRelations = await prisma.customerAssistantRelation.create({
    data: {
      customerId,
      assistantId,
    },
  })

  res.status(201).json(createdRelations)
}
