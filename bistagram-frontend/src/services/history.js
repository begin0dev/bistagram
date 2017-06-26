import request from '../helpers/request';

export const getHistory = () => request({
    url: '/api/history/getHistory'
});
