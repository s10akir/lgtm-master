import express from 'express'
import imagesRouter from './routes/images'

const app = express()

app.get('/', (_, res) => {
  res.json({ message: 'Hello world.' })
})

app.use('/images', imagesRouter)

export default app