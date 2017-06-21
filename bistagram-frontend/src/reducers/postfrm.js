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
  }
}

function postfrm(state=initialState, action) {
  const payload = action.payload;
  switch (action.type) {

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

    default:
      return state;
  }
}


export default postfrm;
