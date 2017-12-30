(function() {
  'use strict';

  const bodyParser  = require('body-parser');
  const express = require('express');

  const Database  = require(`${__dirname}/classes/database`);

  const PORT    = 7331;

  let app       = express();
  let db        = new Database(`${__dirname}/data`);

  app.use(bodyParser.json());

  app.get('/record-list', (req, res)=> {
    res.send(req.query.reverse ? db.getRecordListReverse() : db.getRecordList());
  });

  app.post('/create', (req, res)=> {
    let success = true;

    try {
      db.createRecord(req.body);
    } catch(e) {
      success = false;
    }

    res.status(success ? 200 : 400).send();
  });

  app.listen(PORT, ()=> console.log(`listening on port ${PORT}`));
})();
