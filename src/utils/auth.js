import config from '../config'
import { User } from '../resources/user/user.model'
import jwt from 'jsonwebtoken'

export const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  })
}

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

export const signup = async (req, res) => {
  const email = req.body.email
  const password = req.body.password
  if (!email && !password) {
    return res.status(400).send({ message: 'Email and password are required' })
  }
  try {
    const user = await User.create(req.body)
    const userAuthToken = newToken(user)
    return res.status(201).send({ token: userAuthToken })
  } catch (err) {
    console.error(err)
    return res.status(401).end()
  }
}

export const signin = async (req, res) => {
  const email = req.body.email
  const password = req.body.password
  if (!email && !password) {
    return res.status(400).send({ message: 'Email and password are required' })
  }
  try {
    const user = await User.findOne({ email: email }).exec()
    if (!user) {
      return res.status(401).send({ message: 'User not found' })
    }
    const match = await user.checkPassword(password)
    if (!match) {
      return res.status(401).send({ message: 'Invalid password' })
    }
    const token = newToken(user)
    return res.status(201).send({ token })
  } catch (err) {
    console.error(err)
    return res.status(401).end()
  }
}

export const protect = async (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    return res.status(401).end()
  }
  if (!token.includes('Bearer')) {
    return res.status(401).end()
  }
  try {
    const payload = await verifyToken(token.split(' ')[1])
    const user = await User.findById(payload.id)
      .select('-password')
      .lean()
      .exec()
    req.user = user
    next()
  } catch (e) {
    console.error(e)
    return res.status(401).end()
  }
}
