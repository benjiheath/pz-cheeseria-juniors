import * as express from 'express';
const cheeses = require('./data/cheeses.json');
const cart = require('./data/cart.json');
const fs = require('fs');

const router = express.Router();

router.get('/api/cheeses', (req, res, next) => {
  res.json(cheeses);
});

router.get('/api/cart', (req, res, next) => {
  res.json(cart);
});

router.post('/api/cart', (req, res, next) => {
  const cartItems = req.body;

  fs.writeFile(`src/server/data/cart.json`, JSON.stringify(cartItems), (err: Error) => {
    if (err) {
      console.error(err);
      res.status(500).end();
    }
    res.status(200).end();
  });
});

export default router;
