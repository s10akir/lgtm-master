import { PrismaClient } from '@prisma/client'
import express from 'express'
import { Router } from 'express'
import axios from 'axios'

const imgurClientId = process.env.IMGUR_CLIENT_ID || ''

const prisma = new PrismaClient()
const router = Router()

router.use(express.json({ limit: '10mb' }))

router.get('/', async (_, res) => {
  const images = await prisma.image.findMany({ include: { category: true } })
  res.json(images)
})

router.get('/random', async (req, res) => {
  const requestCategoryId = Number(req.query.categoryId)

  let categoryId
  if (!Number.isNaN(requestCategoryId)) {
    categoryId = requestCategoryId
  }

  // FIXME: AP側でやるのではなく生クエリを書いてランダムに1要素DBから取って来たい
  const images = await prisma.image.findMany({
    where: { categoryId },
    include: { category: true },
  })
  const image = images[Math.floor(Math.random() * images.length)]

  res.json(image)
})

router.post('/', (req, res) => {
  const newImage = req.body.image.replace(/data.*base64/, '')
  const categoryId = Number(req.body.categoryId)

  const data = {
    image: newImage,
  }

  const options = {
    headers: {
      Authorization: `Client-ID ${imgurClientId}`,
    },
  }

  axios
    .post('https://api.imgur.com/3/image', data, options)
    .then((imgurRes) => {
      const url = imgurRes.data.data.link

      prisma.image
        .create({
          data: {
            url,
            category: {
              connect: {
                id: categoryId,
              },
            },
          },
        })
        .then((image) => {
          res.json(image)
        })
        .catch((err) => {
          console.error(err)

          res.json({ error: 'internal server error' })
        })
    })
    .catch((err) => {
      console.error({ err })

      res.json({ error: err.message })
    })
})

export default router

