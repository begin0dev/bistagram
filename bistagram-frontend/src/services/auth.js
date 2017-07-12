import request from '../helpers/request';


export const checkSession = () => request({
    url: '/api/auth/check'
});

export const checkUserName = (username) => {
  return request({
    url: '/api/auth/checkUserName/' + username
  });
}

export const checkNickName = (nickname) =>{
  return request({
    url: '/api/auth/checkNickName/' + nickname
  });
}

export const signUp = ({username, name, nickname, password}) => request({
    url: '/api/auth/signup',
    method: 'post',
    data: {
      username,
      name,
      nickname,
      password
    }
});

export const signIn = ({username, password}) => request({
    url: '/api/auth/signin',
    method: 'post',
    data: {
        username,
        password
    }
});

export const logout = () => request({
    url: '/api/auth/logout',
    method: 'delete'
});


export const profileImgUpdate = (formdata) => request({
    url: '/api/auth/profileImgUpdate',
    method: 'post',
    data: formdata
});

export const profileImgDelete = ({preprofilename}) => request({
    url: '/api/auth/profileImgDelete',
    method: 'delete',
    data: {
      preprofilename
    }
});

export const passwordUpdate = ({prepassword, changepassword}) => request({
    url: '/api/auth/passwordUpdate',
    method: 'post',
    data: {
      prepassword,
      changepassword
    }
});

export const profileUpdate = (user) => request({
    url: '/api/auth/profileUpdate',
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
