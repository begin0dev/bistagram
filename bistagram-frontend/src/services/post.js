import request from '../helpers/request';

export const searchPosts = ({start}) => request({
    url: '/api/post/SearchPosts',
    method: 'post',
    data: {
      start
    }
});

export const likeAtc = ({atcnum}) => request({
    url: '/api/post/likeAtc',
    method: 'post',
    data: {
      atcnum,
    }
});

export const notlikeAtc = ({atcnum}) => request({
    url: '/api/post/notlikeAtc',
    method: 'delete',
    data: {
      atcnum,
    }
});

export const insertReply = ({atcnum}) => request({
    url: '/api/post/insertReply',
    method: 'post',
    data: {
      atcnum,
    }
});

export const deleteReply = ({atcnum}) => request({
    url: '/api/post/deleteReply',
    method: 'delete',
    data: {
      atcnum,
    }
});
