const express = require('express')
const router = express.Router()

router.post('/menuItems', (req, res) => {
  try {
    res.send([global.foodItems, global.foodCategory])
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router
