const express = require('express');
const { apiIndexAction } = require('../controllers/api.js');
const { indexPageAction, prototypePageAction } = require('../controllers/web-client.js');

const router = express.Router({
    caseSensitive: false,
    mergeParams: false,
    strict: false
});

router.get('/', indexPageAction);
router.get('/prototype', prototypePageAction);

router.get('/api/v1', apiIndexAction);

module.exports = router;
