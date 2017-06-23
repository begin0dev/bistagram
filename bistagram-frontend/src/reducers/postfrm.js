import update from 'react/lib/update';
import POSTFRM from '../actions/ActionTypes/postfrm';

const post = {
  content: '',
  media: [],
  media_url: []
}

const initialState = {
  post:{
    ...post
  },
  draging: false
}

function postfrm(state=initialState, action) {
  const payload = action.payload;
  switch (action.type) {

    case POSTFRM.POSTFORM_RESET:
      return{
        ...state,
        post: {
          ...post
        }
      }

    case POSTFRM.SET_POST_CONTENT:
      return{
        ...state,
        post: {
          ...state.post,
          content: payload.value
        }
      }

    case POSTFRM.SET_POST_MEDIA_RESET:
      return{
        ...state,
        post: {
          ...state.post,
          media: [],
          media_url: []
        }
      }

    case POSTFRM.SET_POST_MEDIA:
      return{
        ...state,
        post: {
          ...state.post,
          media: [
            ...state.post.media,
            payload.media
          ],
          media_url: [
            ...state.post.media_url,
            payload.media_url
          ]
        }
      }

    case POSTFRM.MOVE_MEDIA:
      const { lastX, nextX } = payload;
      const dragmedia = state.post.media[lastX];
      const dragmedia_url = state.post.media_url[lastX];
      return update(state,{
        post: {
          media: {
            $splice: [
              [lastX, 1],
              [nextX, 0, dragmedia],
            ]
          },
          media_url: {
            $splice: [
              [lastX, 1],
              [nextX, 0, dragmedia_url],
            ]
          }
        }
      })

    case POSTFRM.DELETE_MEDIA:
      return{
        ...state,
        post: {
          ...state.post,
          media: [
            ...state.post.media.slice(0, payload.index),
            ...state.post.media.slice((payload.index+1), state.post.media.length)
          ],
          media_url: [
            ...state.post.media_url.slice(0, payload.index),
            ...state.post.media_url.slice((payload.index+1), state.post.media_url.length)
          ]
        }
      }

    case POSTFRM.TOGGLE_DRAGGING:
      return {
        ...state,
        draging : payload
      }
    default:
      return state;
  }
}


export default postfrm;
