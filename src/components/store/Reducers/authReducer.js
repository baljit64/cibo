import { SET_USER_DETAIL, SET_TOKEN, LOGOUT } from "../Constants"
const initialState = {
  user: {
    image: "https://cibo-images.s3.ap-south-1.amazonaws.com/default1.png",
    name: 'User',
    phone_number: null,
    email: ''
  },
  token: null
}
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_DETAIL:
      return {
        ...state,
        user: action.payload

      }

    case SET_TOKEN:
      return {
        token: action.payload
      }
    case LOGOUT:
      return initialState

    default:
      return state
  }
}
