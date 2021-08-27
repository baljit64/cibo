
import { SET_LOCATION, SET_MODE, SET_ADDRESS, LOGOUT, SET_SELLER_MODE_PICKUP, SET_SELLER_MODE_DELIVERY, VERIFY_SELLER, SET_DELIVERY_TIME, SET_AMOUNT } from '../Constants'
const initialState = {
  Location: null,
  mode: false,
  address: null,
  seller: false,
  delivery_time: 'standard',
  amount: 0,
  delivery: false,
  pickup_only: false
}
export default function getLocation(state = initialState, action) {
  switch (action.type) {
    case SET_LOCATION:
      return {
        ...state,
        Location: action.payload
      }
    case SET_MODE:
      return {
        ...state,
        mode: action.payload
      }
    case SET_ADDRESS:
      return {
        ...state,
        address: action.payload
      }
    case VERIFY_SELLER:
      return {
        ...state,
        seller: action.payload
      }
    case SET_DELIVERY_TIME:
      return {
        ...state,
        delivery_time: action.payload
      }
    case SET_AMOUNT:
      return {
        ...state,
        amount: action.payload
      }
    case SET_SELLER_MODE_PICKUP:
      return {
        ...state,
        pickup_only: action.payload
      }
    case SET_SELLER_MODE_DELIVERY:
      return {
        ...state,
        delivery: action.payload
      }
    case LOGOUT:
      return initialState
    default:
      return state
  }
}


