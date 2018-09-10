import {CHANGE_IMAGE_URL} from '../actions/image'
import R from 'ramda'

export default function imageWidget(state = {url: ''}, action) {  
  switch (action.type) {
    case CHANGE_IMAGE_URL:
      return R.assoc('url', action.url, state)
    default:
      return state;
  }
}
