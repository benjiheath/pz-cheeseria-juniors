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
  // This handler is likely susceptible to errors/inacurrate data e.g if multiple requests are sent simultaneously
  const purchasedItems = req.body;
  const storedPurchases = JSON.parse(fs.readFileSync(`src/server/data/purchases.json`));

  const combinedLength = storedPurchases.length + purchasedItems.length;

  /* attempting to limit storage to the 12 most recently purchased items to avoid overcrowding the 
   drawer on client side (some visual bugs seem to appear when there's too many items) */
  const appendedPurchases =
    combinedLength > 12
      ? purchasedItems.concat(storedPurchases.slice(0, -(combinedLength - 12)))
      : [...purchasedItems, ...storedPurchases];

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
