import asyncRoute from '../lib/asyncRoute';

export const Explore = asyncRoute(() => import('./Explore'));
export const Login = asyncRoute(() => import('./Login'));
export const Posts = asyncRoute(() => import('./Posts'));
export const Mypage = asyncRoute(() => import('./Mypage'));
export const Fblogged = asyncRoute(() => import('./Fblogged'));
export const SearchHash = asyncRoute(() => import('./SearchHash'));
export const SearchUser = asyncRoute(() => import('./SearchUser'));
export const NotFound = asyncRoute(() => import('./NotFound'));
