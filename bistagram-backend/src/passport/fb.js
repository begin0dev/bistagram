module.exports = {
  'appID' : '319492721808792',
  'appSecret' : process.env.FACEBOOK_SECRET,
  'callbackURL' : '/api/auth/facebook/callback',
  'profileFields': ['id', 'name', 'emails', 'gender', 'picture.type(large)']
}
