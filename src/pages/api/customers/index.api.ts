import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { name, code, network } = req.body

  const customerExists = await prisma.customer.findUnique({
    where: {
      code,
    }
  })

  if (customerExists) {
    return res.status(400).json({
      message: 'O código usado no cadastro já está sendo usado. Use um outro código para esse cadastro.'
    })
  }
  
  const customer = await prisma.customer.create({
    data: {
      code,
      name,
      network,
    },
  })

  res.status(201).json(customer)
}
