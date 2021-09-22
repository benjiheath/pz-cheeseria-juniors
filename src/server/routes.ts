import * as express from 'express';
const cheeses = require('./data/cheeses.json');
const purchases = require('./data/purchases.json');
const fs = require('fs');

const router = express.Router();

router.get('/api/cheeses', (req, res, next) => {
  res.json(cheeses);
});

router.get('/api/purchases', (req, res, next) => {
  res.json(purchases);
});

router.post('/api/purchases', (req, res, next) => {
  const purchasedItems = req.body;

  fs.writeFile(`src/server/data/purchases.json`, JSON.stringify(purchasedItems), (err: Error) => {
    if (err) {
      console.error(err);
      res.status(500).end();
    }
    res.status(200).end();
  });
});

export default router;
