import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()

const log = (req, res, next) => {
  console.log('logging')
  next()
}
app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.get('/', log, (req, res) => {
  res.send({ message: 'Hello World!' })
})

app.post('/', (req, res) => {
  console.log(req.body)
  res.send({ message: 'OK' })
})

export const start = () => {
  app.listen(3000, () => {
    console.log('server running on port 3000')
  })
}
