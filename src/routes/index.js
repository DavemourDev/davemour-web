const express = require('express');
const { apiIndexAction, getThemesAction, putThemesAction, putThemeByIdAction } = require('../controllers/api.js');
const { indexPageAction, prototypePageAction } = require('../controllers/web-client.js');

const router = express.Router({
    caseSensitive: false,
    mergeParams: false,
    strict: false
});

// "start:dev": "nodemon --watch \"./**\" --ext \"js\" --exec \"node --env-file=.env main.js\"",

router.get('/', indexPageAction);
router.get('/prototype', prototypePageAction);

router.get('/api/v1', apiIndexAction);

router.get('/api/v1/themes', getThemesAction);
router.put('/api/v1/themes/:id', putThemeByIdAction);

module.exports = router;
