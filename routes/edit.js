import express from 'express';

import mySqlConnectionFactory from '../mysql/MySqlConnectionFactory';

const router = express.Router();

router.get('/edit', function(req, res, next) {
  
        res.render('edit', {  })

  
});
router.post('/edit', function(req, res, next) {
  
  const value = req.body['value'];

  mySqlConnectionFactory({ }).then(connection => {
    connection.query('INSERT INTO test (value) SET value = ?', value, (error, results, fields) => {
      if (error) {

      } else {
        res.render('edit', {  })
      }
    })
  }).catch(error => console.error(error));
  
});

export default router;
