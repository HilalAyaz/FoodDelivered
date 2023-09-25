const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')

const bcrypt = require('bcryptjs')

router.post(
  '/createUser',
  body('email', 'Enter a valid Email').isEmail(),
  body('password', 'Password is incorrect').isLength({ min: 6 }),
  body('name', 'Enter Your Correct Name').isLength({ min: 3 }),
  body('address'),

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const salt = await bcrypt.genSalt(10)
    const securedPassword = await bcrypt.hash(req.body.password, salt)

    try {
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securedPassword,
        address: req.body.address,
        created_at: req.body.date
      })
      res.json({ success: true })
    } catch (err) {
      console.log(err)
      res.status(500).json({ success: false, error: err })
    }
  }
)

module.exports = router
