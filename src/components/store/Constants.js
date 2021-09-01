

export const SET_TOKEN = "SET_TOKEN"
export const SET_USER_DETAIL = "SET_USER_DETAIL"
export const VERIFY_SELLER = "VERIFY_SELLER"
export const REMOVE_USER_DETAIL = "REMOVE_USER_DETAIL"
export const SET_LOCATION = "SET_LOCATION"
export const LOGOUT = "LOGOUT"
export const SET_MODE = "SET_MODE"
export const SET_ADDRESS = "SET_ADDRESS"
export const RECENT_POSTS = 'RECENT_POSTS'
export const SET_DELIVERY_TIME = 'SET_DELIVERY_TIME'
export const SET_AMOUNT = 'SET_AMOUNT'
export const SET_SELLER_MODE_PICKUP = 'SET_SELLER_MODE_PICKUP'
export const SET_SELLER_MODE_DELIVERY = 'SET_SELLER_MODE_DELIVERY'
export const SET_LIKE = 'SET_LIKE'
export const SET_KEYWORD = 'SET_KEYWORD'
export const EDIT_ITEM = 'EDIT_ITEM'
export const VIEW_ORDER = 'VIEW_ORDER'
export const CHANGE_SELLER_STATUS = 'CHANGE_SELLER_STATUS'


// Actions
export const setToken = (token) => {
  return { type: SET_TOKEN, payload: token }
}

// is seller account or not
export const verifySeller = (verified) => {
  return { type: VERIFY_SELLER, payload: verified }
}

// view order detail on seller side
export const viewOrder = (data) => {
  return { type: VIEW_ORDER, payload: data };
}

// change the status of order by accept or reject it on seller side
export const changeOrderStatus = (status) => {
  return { type: CHANGE_SELLER_STATUS, payload: { seller_status: status } }
}

// edit item in seller account
export const editItem = (data) => {
  return { type: EDIT_ITEM, payload: data };
}

// seller profile switch delivery modes
export const sellerDeliveryMode = (data) => {
  return { type: SET_SELLER_MODE_DELIVERY, payload: data };
}
export const sellerPickUpMode = (data) => {
  return { type: SET_SELLER_MODE_PICKUP, payload: data };
}