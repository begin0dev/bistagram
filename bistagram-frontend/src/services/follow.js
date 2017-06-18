import request from '../helpers/request';

export const recommendFollow = ({username, start, count}) => request({
    url: '/api/follow/RecommedFollow',
    method: 'post',
    data: {
      username,
      start,
      count
    }
});

export const following = ({username, follower}) => request({
    url: '/api/follow/following',
    method: 'post',
    data: {
      username,
      follower
    }
});

export const unfollow = ({username, follower}) => request({
    url: '/api/follow/unfollow',
    method: 'delete',
    data: {
      username,
      follower
    }
});
