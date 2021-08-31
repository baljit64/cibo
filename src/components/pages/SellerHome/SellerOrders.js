import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Fade from 'react-reveal'
import API from '../../Services/Api'
import Loader from '../Loaders/Spinner'
import { useHistory } from 'react-router-dom'
function SellerOrders() {
  const history = useHistory();
  const dispatch = useDispatch()
  const [orderList, setOrderList] = useState([])
  const token = useSelector(state => state.authReducer.token)
  let headers = {
    Authorization: `Bearer ${token}`
  }
  const [loading, setLoading] = useState(true)
  const ApiCall = async () => {
    try {
      let result = await API.get('/show_orders_list_to_seller', { headers: headers })
      if (result.status === 200) {
        setOrderList(result.data.data)
        setLoading(false)
      }
    }
    catch (e) {
      if (e.response) {
        setLoading(false)
        console.log(e.response.data)
      }
    }
  }
  useEffect(() => {
    ApiCall()
  }, [ApiCall])
  const acceptOrder = async (order_id) => {
    let data = {
      order_id, status: "accept"
    }
    try {
      let result = await API.post('/show_order_status', data, { headers: headers })
      if (result.status === 200) {
        ApiCall()
      }
    }
    catch (e) {
      if (e.response) {
        console.log(e.response.data)
      }
    }
  }
  const cancelOrder = async (order_id) => {
    let data = {
      order_id, status: "reject"
    }
    try {
      let result = await API.post('/show_order_status', data, { headers: headers })
      if (result.status === 200) {
        ApiCall()
      }
    }
    catch (e) {
      if (e.response) {
        console.log(e.response.data)
      }
    }
  }
  const submitDelivery = async (order_id) => {
    let data = {
      order_id, status: "submit"
    }
    try {
      let result = await API.post('/show_order_status', data, { headers: headers })
      if (result.status === 200) {
        ApiCall()
      }
    }
    catch (e) {
      if (e.response) {
        console.log(e.response.data)
      }
    }
  }
  const viewOrder = (item) => {
    dispatch({ type: 'VIEW_ORDER', payload: item })
    history.push("/seller/orders/view")
  }
  if (loading) {
    return (
      <Loader />
    )
  }
  return (
    <div className='w-100'>
      <div className='seller-order-wrap'>
        <div className='seller-order-header'>
          Orders
        </div>
        <div className='order-req-wrap d-flex flex-column'>
          <div className='order--header'>Order Requests</div>
          <div className='order--body d-flex flex-column'>
            {/* req order */}
            {
              orderList && orderList.map((element, i) =>
                element.seller_status === 'request' ?

                  <div key={i} className='reuested-orders my-1 px-2'>
                    <Fade up>
                      <div className='req-order-details d-flex flex-row justify-content-between'>
                        <div className='soib'>
                          <img alt='' src={element.all_item[0].item_image} />
                        </div>
                        <div className='pt-2 req-order-user-info d-flex flex-column'>
                          <span className='req-item-name'>{element.all_item[0].item_name}</span>
                          <span className='req-item-quantity'>{element.all_item[0].quantity}x</span>
                          <span className='order-type'>{element.order_type}</span>
                          <span onClick={() => viewOrder(element)} className='view-order'>View Detail</span>
                        </div>
                      </div>
                      <hr className='text-muted' />
                      <div className='req-order-footer pb-3 d-flex flex-row align-items-center justify-content-between'>
                        <div className='d-flex flex-column'>
                          <span className='order-total-label'>total payment</span>
                          <span className='order-amount'>${element.orderAmount}</span>
                        </div>
                        <div className='d-flex flex-row' >
                          <span onClick={() => acceptOrder(element._id)} className='accept-order'>Accept</span>
                          <span onClick={() => cancelOrder(element._id)} className='reject-order'>Reject</span>
                        </div>
                      </div>
                    </Fade>
                  </div>

                  : ''
              )
            }
            {/* end of req order */}
            {/* accepted order */}
            <div className='order--header'>Order OnProgress</div>
            {
              orderList && orderList.map((element, i) =>
                element.seller_status === 'pending' ?

                  <div key={i} className='reuested-orders px-2'>
                    <Fade up>
                      <div className='req-order-details w-100 d-flex flex-row justify-content-between'>

                        <div className='soib'>
                          <img alt='' src={element.all_item[0].item_image} />
                        </div>
                        <div className='pt-2 req-order-user-info d-flex flex-column'>
                          <span className='req-item-name'>{element.all_item[0].item_name}</span>
                          <span className='req-item-quantity'>{element.all_item[0].quantity}x</span>
                          <span className='order-type'>{element.order_type}</span>
                          <span onClick={() => viewOrder(element)} className='view-order'>View Detail</span>
                        </div>
                      </div>
                      <hr className='text-muted' />
                      <div className='req-order-footer pb-3 d-flex flex-row align-items-center justify-content-between'>
                        <div className='d-flex flex-column'>
                          <span className='order-total-label'>total payment</span>
                          <span className='order-amount'>${element.orderAmount}</span>
                        </div>
                        <div className='d-flex flex-row' >
                          {/* <span onClick={e => acceptOrder(element._id)} className='accept-order'>Accept</span> */}
                          <span onClick={() => submitDelivery(element._id)} className='submit-order'>{element.order_type === 'delivery' ? 'Submit Delivery Order' : 'Submit Pickup Order'}</span>
                        </div>
                      </div>
                    </Fade>
                  </div>
                  : ''
              )
            }
            <div className='order--header'>Order Completed</div>
            {
              orderList && orderList.map((element, i) =>
                element.seller_status === 'completed' ?

                  <div key={i} className='reuested-orders mb-2 px-2'>
                    <Fade up>
                      <div className='req-order-details w-100 d-flex flex-row justify-content-between'>
                        <div className='soib'>
                          <img alt='' src={element.all_item[0].item_image} />
                        </div>
                        <div className='req-order-user-info d-flex pt-2 flex-column'>
                          <span className='req-item-name'>{element.all_item[0].item_name}</span>
                          <span className='req-item-quantity'>{element.all_item[0].quantity}x</span>
                          <span className='order-type'>{element.order_type}</span>
                          <span onClick={() => viewOrder(element)} className='view-order'>View Detail</span>
                        </div>
                      </div>
                      <hr className='text-muted' />
                      <div className='req-order-footer pb-3 d-flex flex-row align-items-center justify-content-between'>
                        <div className='d-flex flex-column'>
                          <span className='order-total-label'>total payment</span>
                          <span className='order-amount'>${element.orderAmount}</span>
                        </div>
                        <div className='d-flex flex-row' >
                          {/* <span onClick={e => acceptOrder(element._id)} className='accept-order'>Accept</span> */}
                          <span className='completed-order'>Completed</span>
                        </div>
                      </div>
                    </Fade>
                  </div>

                  : ''
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}
export default SellerOrders
