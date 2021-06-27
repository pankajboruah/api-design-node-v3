import { Router } from 'express'

const router = Router()

const controller = (req, res) => {
  res.send({ message: 'hello world' })
}
// router.get('/api/item', (req, res) => {
//   res.send({ message: 'items' })
// })

// router.post('/api/item', (req, res) => {
//   res.send({ message: 'post a new item' })
// })

// router.get('/api/item/:id', (req, res) => {
//   res.send({ message: `get item with id: ${req.params.id}` })
// })

// router.put('/api/item/:id', (req, res) => {
//   res.send({ message: `update item with id: ${req.params.id}` })
// })

// router.delete('/api/item/:id', (req, res) => {
//   res.send({ message: `delete item with id: ${req.params.id}` })
// })

// equivalent to /api/item
router
  .route('/')
  .get(controller)
  .post(controller)

// equivalent to /api/item/:id
router
  .route('/:id')
  .get(controller)
  .put(controller)
  .delete(controller)

export default router
