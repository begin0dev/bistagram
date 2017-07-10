import request from '../helpers/request';


export const checkSession = () => request({
    url: '/api/account/check'
});

export const checkUserName = (username) => {
  return request({
    url: '/api/account/checkUserName/' + username
  });
}

export const checkNickName = (nickname) =>{
  return request({
    url: '/api/account/checkNickName/' + nickname
  });
}

export const signUp = ({username, name, nickname, password}) => request({
    url: '/api/account/signup',
    method: 'post',
    data: {
      username,
      name,
      nickname,
      password
    }
});

export const signIn = ({username, password}) => request({
    url: '/api/account/signin',
    method: 'post',
    data: {
        username,
        password
    }
});

export const logout = () => request({
    url: '/api/account/logout',
    method: 'delete'
});


export const profileImgUpdate = (formdata) => request({
    url: '/api/account/profileImgUpdate',
    method: 'post',
    data: formdata
});

export const profileImgDelete = ({preprofilename}) => request({
    url: '/api/account/profileImgDelete',
    method: 'delete',
    data: {
      preprofilename
    }
});

export const profileUpdate = (user) => request({
    url: '/api/account/profileUpdate',
    method: 'post',
    data: user
});

export const getHistory = () => request({
    url: '/api/history/getHistory'
});


export const recommendFollow = ({start, count}) => request({
    url: '/api/follow/RecommedFollow',
    method: 'post',
    data: {
      start,
      count
    }
});

export const following = ({follower}) => request({
    url: '/api/follow/following',
    method: 'post',
    data: {
      follower
    }
});

export const unfollow = ({follower}) => request({
    url: '/api/follow/unfollow',
    method: 'delete',
    data: {
      follower
    }
});
