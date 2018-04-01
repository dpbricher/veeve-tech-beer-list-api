#!/usr/bin/env node
// version v8.9.3
(function() {
  'use strict';

  const bodyParser  = require('body-parser');
  const express = require('express');

  const Database  = require(`${__dirname}/classes/database`);

  const PORT    = 7331;
  const DATA_DIR  = process.env.DATA_DIR || `${__dirname}/data`;

  let app       = express();
  let db        = new Database(DATA_DIR);

  app.use(bodyParser.json());

  app.get('/record-list', (req, res)=> {
    res.send(req.query.reverse ? db.getRecordListReverse() : db.getRecordList());
  });

  app.get('/user-list', (req, res)=> res.send(db.getUserList()));

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
