const router = require('express').Router();

router.use('/users', require('./auth'));

router.use('/restaurants', require('./restaurants'));

module.exports = router;