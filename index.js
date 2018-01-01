#!/usr/bin/env node
// version v8.9.3
(function() {
  'use strict';

  const bodyParser  = require('body-parser');
  const crypto  = require('crypto');
  const express = require('express');

  const Database  = require(`${__dirname}/classes/database`);

  const DIGEST_TYPE = 'hex';
  const HASH_TYPE = 'sha256';
  const PORT    = 7331;

  let app       = express();
  let db        = new Database(`${__dirname}/data`);

  app.use(bodyParser.json());

  app.get('/record-list', (req, res)=> {
    res.send(req.query.reverse ? db.getRecordListReverse() : db.getRecordList());
  });

  app.get('/user-list', (req, res)=> res.send(db.getUserList().map(i => ({ name:i.name }))));

  app.post('/create', (req, res)=> {
    let success = true;

    try {
      db.createRecord(req.body);
    } catch(e) {
      success = false;
    }

    res.status(success ? 200 : 400).send();
  });

  app.post('/user/password', (req, res)=> {
    let { user, old_pass, new_pass }  = req.body;

    const failInvalid = ()=> res.status(400).send('Invalid user/pass combination');

    if (user && old_pass && new_pass) {
      let userList  = db.getUserList();

      let dbUser  = userList.find(i => i.name === user);

      if (dbUser) {
        let oldHash = crypto.createHash(HASH_TYPE).update(old_pass).digest(DIGEST_TYPE);
        let dbOldHash = dbUser.pass;

        if (crypto.timingSafeEqual(Buffer.from(oldHash), Buffer.from(dbOldHash))) {
          let newHash = crypto.createHash(HASH_TYPE).update(new_pass).digest(DIGEST_TYPE);

          db.updateUser(user, { pass:newHash });

          res.status(200).send('User password updated');
        } else
          failInvalid();
      } else
        failInvalid();
    } else
      res.status(400).send('Missing one or more required parameters')
  });

  app.post('/user/verify', (req, res)=> {
    let { user, pass }  = req.body;

    const failInvalid = ()=> res.status(400).send('Invalid user/pass combination');

    if (user && pass) {
      let userList  = db.getUserList();
      let dbUser  = userList.find(i => i.name === user);

      if (dbUser) {
        let hash  = crypto.createHash(HASH_TYPE).update(pass).digest(DIGEST_TYPE);
        let dbHash  = dbUser.pass;

        if (crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(dbHash)))
          res.status(200).send('Valid user/pass combination');
        else
          failInvalid();
      } else
        failInvalid();
    } else
      res.status(400).send('Missing one or more required parameters');
  });

  app.listen(PORT, ()=> console.log(`listening on port ${PORT}`));
})();
