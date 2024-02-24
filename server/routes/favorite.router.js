const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {
  res.sendStatus(200);
});

// add a new favorite
router.post('/', (req, res) => {
  const sqlText = `INSERT INTO "favorites" ("url", "alt", "category_id")
  VALUES ($1, $2, $3);`;
  const { url, alt, category_id } = req.body;
  pool
    .query(sqlText, [url, alt, category_id])
    .then((response) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('error in getting favorites', error);
      res.sendStatus(500);
    });
});

// update a favorite's associated category
router.put('/:id', (req, res) => {
  // req.body should contain a category_id to add to this favorite image
  const sqlText = `UPDATE "favorites" SET "url" = $2, "alt" = $3, "category_id" =$4
  WHERE 'id" = $1;`;
  const { id } = req.params;
  const { url, alt, category_id } = req.body;

  pool
    .query(sqlText, [id, url, alt, category_id])
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('error getting favorites', error);
      res.sendStatus(500);
    });
});

// delete a favorite
router.delete('/:id', (req, res) => {
  const sqlText = `DELETE FROM "favorites" WHERE "id" = $1;`;
  const { id } = req.params;

  pool
    .query(sqlText, [id])
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('error deleting favorites', error);
      res.sendStatus(500);
    });
});

module.exports = router;
