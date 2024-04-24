import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'PUT') {
    return res.status(405).end();
  }

  const { assistantId, customerId } = req.body;

  // Verifique se assistantId e customerId são fornecidos
  if (!assistantId || !customerId) {
    return res.status(400).json({ error: "Both assistantId and customerId must be provided." });
  }


  // Encontre a relação com base nos IDs fornecidos
  const relation = await prisma.customerAssistantRelation.findFirst({
    where: {
      assistantId: assistantId,
      customerId: customerId,
    },
  });

  // Se a relação existe, delete-a
  if (relation) {
    await prisma.customerAssistantRelation.delete({
      where: {
        id: relation.id,
      },
    });
  } else {
    // Se a relação não existe, retorne um status 404 (Not Found)
    return res.status(404).json({ error: "Relation not found." });
  }

  // Retorne um status indicando sucesso
  res.status(204).end();

}
