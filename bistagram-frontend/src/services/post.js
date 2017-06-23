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

export const insertReply = ({atcnum, content}) => request({
    url: '/api/post/insertReply',
    method: 'post',
    data: {
      atcnum,
      content
    }
});

export const deleteReply = ({replynum}) => request({
    url: '/api/post/deleteReply',
    method: 'delete',
    data: {
      replynum
    }
});

export const getAllReplies = ({atcnum, count}) => request({
    url: '/api/post/getAllReplies',
    method: 'post',
    data: {
      atcnum,
      count
    }
});

export const uploadPost = (formdata) => request({
    url: '/api/post/uploadPost',
    method: 'post',
    data: formdata
});
