import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient()

const router = Router()

router.get('/random', async (req, res) => {
  const requestCategoryId = Number(req.query.categoryId)

  let categoryId
  if (!Number.isNaN(requestCategoryId)) {
    categoryId = requestCategoryId
  }

  // FIXME: AP側でやるのではなく生クエリを書いてランダムに1要素DBから取って来たい
  const images = await prisma.image.findMany(
    {
      where: { categoryId: categoryId },
      include: { category: true }
    }
  )
  const image = images[Math.floor(Math.random() * images.length)]

  res.json(image)
})

export default router