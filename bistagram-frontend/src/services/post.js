import request from '../helpers/request';

export const searchPosts = ({id, start}) => request({
    url: '/api/post/SearchPosts',
    method: 'post',
    data: {
      id,
      start
    }
});
