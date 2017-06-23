import express from 'express';

import account from './account';
import post from './post';
import follow from './follow';
import upload from './upload';

const router = new express.Router();

router.use('/account', account);
router.use('/post', post);
router.use('/follow', follow);
router.use('/upload', upload);

module.exports = router;
