module.exports = {
  'appID' : '319492721808792',
  'appSecret' : process.env.FACEBOOK_SECRET,
  'callbackURL' : '/api/account/facebook/callback',
  'profileFields': ['id', 'name', 'emails', 'gender']
}
