import update from 'react/lib/update';
import FORM from '../actions/ActionTypes/form';

const post = {
  content: '',
  media: [],
  media_url: []
}

const initialState = {
  loading: {
    login: true,
    post: true
  },
  post:{
    ...post
  }
}

function form(state=initialState, action) {
  const payload = action.payload;
  switch (action.type) {

    case FORM.POSTFORM_RESET:
      return{
        ...state,
        post: {
          ...post
        }
      }

    case FORM.SET_POST_CONTENT:
      return{
        ...state,
        post: {
          ...state.post,
          content: payload.value
        }
      }

    case FORM.SET_POST_MEDIA_RESET:
      return{
        ...state,
        post: {
          ...state.post,
          media: [],
          media_url: []
        }
      }

    case FORM.SET_POST_MEDIA:
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

    case FORM.MOVE_MEDIA:
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

    case FORM.DELETE_MEDIA:
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

    default:
      return state;
  }
}


export default form;
