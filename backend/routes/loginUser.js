const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')

require('dotenv').config()

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post(
  '/loginUser',

  body('email', 'Enter a valid Email').isEmail(),
  body('password', 'Password is incorrect').isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    let email = req.body.email

    try {
      let userData = await User.findOne({ email })
      if (!userData) {
        return res
          .status(400)
          .send({ error: 'Try to login with a correct email' })
      }

      const comparePassword = await bcrypt.compare(
        req.body.password,
        userData.password
      )

      if (!comparePassword) {
        return res
          .status(400)
          .send({ error: 'Try to login with a correct password' })
      }
      const data = {
        user: {
          id: userData._id
        }
      }
      const authToken = jwt.sign(data, process.env.JWT_SECRET)
      return res.json({ success: true, authToken: authToken })
    } catch (err) {
      console.log(err, 'Login with correct credentials')
      res
        .status(500)
        .json({ success: false, error: 'Login with correct credentials' })
    }
  }
)

module.exports = router
