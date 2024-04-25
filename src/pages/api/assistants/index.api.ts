import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { name, email, phone } = req.body

  const assistantExists = await prisma.assistant.findUnique({
    where: {
      email,
    }
  })

  if (assistantExists) {
    return res.status(400).json({
      message: 'O email usado no cadastro já está sendo usado. Use um outro email para esse cadastro.'
    })
  }
  
  const assistant = await prisma.assistant.create({
    data: {
      email,
      name,
      phone,
    },
  })

  res.status(201).json(assistant)
}
