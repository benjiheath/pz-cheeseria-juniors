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
  // susceptible to errors/inacurrate data e.g if multiple requests are sent simultaneously
  const purchasedItems = req.body;
  const storedPurchases = JSON.parse(fs.readFileSync(`src/server/data/purchases.json`));
  const appendedPurchases = [...purchasedItems, ...storedPurchases];

  fs.writeFile(`src/server/data/purchases.json`, JSON.stringify(appendedPurchases), (err: Error) => {
    if (err) {
      console.error(err);
      res.status(500).end();
      return;
    }
    res.status(200).end();
  });
});

export default router;
