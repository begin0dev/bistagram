import request from '../helpers/request';

export const checkUserId = (id) => {
  return request({
    url: '/api/account/idCheck/' + id
  });
}

export const checkUserNick = (nick) =>{
  return request({
    url: '/api/account/nickCheck/' + nick
  });
}

export const SignUp = ({id, name, nick, pw}) => request({
    url: '/api/account/signup',
    method: 'post',
    data: {
      id,
      name,
      nick,
      pw
    }
});

export const SignIn = ({id, pw}) => request({
    url: '/api/account/signin',
    method: 'post',
    data: {
        id,
        pw
    }
});

export const logout = () => request({
    url: '/api/account/logout',
    method: 'post'
});
