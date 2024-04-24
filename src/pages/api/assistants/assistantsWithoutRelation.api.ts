import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";


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

  const { assistantIdSelected } = req.query;

  /*

  if (!assistantIdSelected) {
    return res.status(400).json({ message: 'Year or month not specified.' });
  }; */

  const assistantRelations: Array<ICustomerProp> = await prisma.$queryRaw`
    SELECT *
    FROM customers
    WHERE id IN (
      SELECT customerId
      FROM customer_assistant_relations
      WHERE assistantId = ${assistantIdSelected}
    );
  `;

  res.status(201).json(assistantRelations);
}
