import express from 'express';

import account from './account';
import post from './post';
import follow from './follow';
import history from './history';

const router = new express.Router();

router.use('/account', account);
router.use('/post', post);
router.use('/follow', follow);
router.use('/history', history);

module.exports = router;
