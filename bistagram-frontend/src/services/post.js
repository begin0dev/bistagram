import request from '../helpers/request';

export const searchPosts = ({username, start}) => request({
    url: '/api/post/SearchPosts',
    method: 'post',
    data: {
      username,
      start
    }
});

export const likeAtc = ({username, atcnum}) => request({
    url: '/api/post/likeAtc',
    method: 'post',
    data: {
      username,
      atcnum,
    }
});

export const notlikeAtc = ({username, atcnum}) => request({
    url: '/api/post/notlikeAtc',
    method: 'delete',
    data: {
      username,
      atcnum,
    }
});

export const insertReply = ({username, atcnum}) => request({
    url: '/api/post/insertReply',
    method: 'post',
    data: {
      username,
      atcnum,
    }
});

export const deleteReply = ({username, atcnum}) => request({
    url: '/api/post/deleteReply',
    method: 'delete',
    data: {
      username,
      atcnum,
    }
});
