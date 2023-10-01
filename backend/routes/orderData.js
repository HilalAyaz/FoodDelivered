const express = require('express')
const Order = require('../models/orders')
const router = express.Router()

router.post('/orderData', async (req, res) => {
  let data = req.body.order_data;
  let orderDate = new Date(); 

  try {
    let eId = await Order.findOne({ email: req.body.email });
    console.log(eId);
    if (eId === null) {
      await Order.create({
        email: req.body.email,
        order_data: [{ items: data, orderDate: orderDate }] 
      });
    } else {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: { items: data, orderDate: orderDate } } } 
      );
    }
    res.json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});



router.post('/myOrderData', async (req, res) => {
    try {
    let myData = await Order.findOne({'email': req.body.email})
    res.json({orderData:myData})
    } catch (err){
        res.status(500).send({'error': err.message})    
    }

})


module.exports = router
