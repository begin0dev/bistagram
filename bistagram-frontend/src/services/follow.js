import request from '../helpers/request';

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
