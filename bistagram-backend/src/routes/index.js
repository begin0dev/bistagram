import express from 'express';

import account from './account';
import post from './post';
import follow from './follow';

const router = new express.Router();

router.use('/account', account);
router.use('/post', post);
router.use('/follow', follow);

module.exports = router;
