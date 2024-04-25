import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

interface ICustomerProp {
  id: string,
  code: string,
  name: string,
  network: string,
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const customersWithoutRelation: Array<ICustomerProp> = await prisma.$queryRaw`
    SELECT *
    FROM customers
    WHERE id NOT IN (
        SELECT customerId
        FROM customer_assistant_relations
    );
  `

  res.status(201).json(customersWithoutRelation);
}