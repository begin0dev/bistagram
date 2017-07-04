import request from '../helpers/request';

export const searchHash = ({keyword}) => request({
    url: '/api/search/SearchHash',
    method: 'post',
    data: {
      keyword
    }
});

export const addHash = ({keyword, atcnums}) => request({
    url: '/api/search/addHash',
    method: 'post',
    data: {
      keyword,
      atcnums
    }
});

export const getModalPost = ({atcnum}) => request({
    url: '/api/search/getModalPost',
    method: 'post',
    data: {
      atcnum
    }
});
