import { Router } from 'express'

const router: Router = Router()

router.post('/login', (req, res) => {
  res.send('Login user')
})

router.post('/register', (req, res) => {
  res.send('Register user')
})

export default router
