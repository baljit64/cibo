
import { SET_LIKE, LOGOUT, SET_KEYWORD, EDIT_ITEM } from '../Constants'
const initialState = {
  liked: 0,
  keyword: null,
  item: null,
  orderDetail: null
}


export default function data(state = initialState, action) {

  switch (action.type) {

    case SET_LIKE:
      return {
        ...state,
        liked: state.liked + 1
      }
    case SET_KEYWORD:
      return {
        ...state,
        keyword: action.payload
      }
    case EDIT_ITEM:
      return {
        ...state,
        item: action.payload
      }
    case 'VIEW_ORDER':
      return {
        ...state,
        orderDetail: action.payload
      }
    case 'CHANGE_SELLER_STATUS':
      return {
        ...state,
        orderDetail: { ...state.orderDetail, seller_status: action.payload.seller_status }
      }
    case LOGOUT:
      return initialState
    default:
      return state
  }
}

