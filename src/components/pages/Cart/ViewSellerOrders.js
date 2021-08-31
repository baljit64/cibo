import './Cart.css'
import API from '../../Services/Api'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import Fade from 'react-reveal'
export default function ViewSellerOrders() {
  const item = useSelector(state => state.data.orderDetail)
  const history = useHistory()
  const dispatch = useDispatch()
  const token = useSelector(state => state.authReducer.token)
  let headers = {
    Authorization: `Bearer ${token}`
  }
  const acceptOrder = async (order_id) => {

    let data = {
      order_id, status: "accept"
    }
    try {

      let result = await API.post('/show_order_status', data, { headers: headers })
      if (result.status === 200) {
        console.log(result)
        dispatch({ type: 'CHANGE_SELLER_STATUS', payload: { seller_status: 'pending' } })

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
        history.push('/seller/orders')
      }
    }
    catch (e) {
      if (e.response) {
        console.log(e.response.data)
      }
    }
  }
  const submitOrder = async (order_id) => {

    let data = {
      order_id, status: "submit"
    }
    try {

      let result = await API.post('/show_order_status', data, { headers: headers })
      if (result.status === 200) {
        dispatch({ type: 'CHANGE_SELLER_STATUS', payload: { seller_status: 'completed' } })

      }
    }
    catch (e) {
      if (e.response) {
        console.log(e.response.data)
      }
    }
  }

  return (
    <div id="ViewOrder">
      <div className='container px-0'>
        <div className='cart-header px-2'>
          Order Detail
        </div>
        {
          <div className='cart-wrap d-flex'>
            <div className='cart-left d-flex flex-column'>
              {/* items list here */}
              {
                item.all_item.length > 0 ?
                  item.all_item.map((i, index) =>
                    <div key={index}>
                      <Fade left>
                        <div className='cart-item d-flex flex-row'>
                          <div className='cart-img'><img src={i.item_image} />
                          </div>
                          <div className='cart-content pt-1  d-flex flex-column '>
                            <span className='cart-item-name pb-1'>{i.item_name}</span>

                            <span className='cart-item-quantity'>x{i.quantity}</span>
                          </div>
                          <div className='cart-price d-flex flex-column'>

                            <span className='cart-item-price'>${i.price}</span>

                          </div>
                        </div>
                      </Fade>
                      <hr className='bg-muted cart-divider-line mx-auto'></hr>
                    </div>
                  ) : ""
              }
              {/* items list ends here */}

            </div>
            {/* order address & payment details */}
            <Fade right>
              <div className='cart-right d-flex flex-column'>
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <div className="orderSellerimg"><img src={item.user_image} alt='user' /></div>
                  <span className="user-name-on-order text-capitalize">{item.user_name}</span>
                  {item.order_type === "pickup_only" ? <div className='cart-adress w-100   py-2 d-flex justify-content-between align-items-center flex-row'>
                    <span className='seller-order-type'>Order Type</span>
                    <span className='seller-order-value'>Pick Up</span>
                  </div> : ''}
                  {item.order_type === "pickup_only" && (item.seller_status === "request") ? <hr className='cart-right-divider mx-auto' /> : ''}
                </div>

                {item.order_type === "delivery" ? <div className='cart-adress pb-3 d-flex flex-column'>
                  <hr className='cart-right-divider mx-auto' />
                  <span className='deliver-to'>Delivery Address</span>
                  <span className='delivery-address'>{item.user_delivery_address}</span>
                </div> : ''}
                {item.seller_status === "request" ?
                  <div className="d-flex flex-row  align-items-center justify-content-end">
                    <button onClick={() => acceptOrder(item._id)} className="accept-order">Accept</button>
                    <button onClick={() => cancelOrder(item._id)} className="reject-order">Reject</button>
                  </div> : ''}
                {item.seller_status === "pending" ?
                  <div className="d-flex flex-row align-items-center justify-content-end">
                    <button onClick={() => submitOrder(item._id)} className="accept-order">Submit order delivery</button>

                  </div> : ''}
                <hr className='cart-right-divider mx-auto' />
                <div className='cart-adress d-flex flex-column'>


                  <div className='d-flex flex-row px-1 py-2 align-items-center justify-content-between'>
                    <span className='deliver-to font-weight-bold'>Order Status</span> <span className='promo-discount  text-capitalize'>{item.seller_status}</span>
                  </div>
                  <hr className='cart-right-divider mx-auto' />
                  <div className='charges-wrap'>
                    <div className='d-flex flex-row align-items-center justify-content-between'><span className='item-total'>Item Total</span><span className='item-total-price'>${item.orderAmount}</span></div>
                    <div className='d-flex flex-row align-items-center justify-content-between'><span className='delivery-charges'>Delivery Charge</span><span className='delivery-charges-price'>${'0'}</span></div>
                    <div className='d-flex flex-row align-items-center justify-content-between'><span className='delivery-charges'>Service Charge</span><span className='delivery-charges-price'>${'0'}</span></div>
                    <div className='d-flex flex-row align-items-center justify-content-between'><span className='promo-discount'>Promo Discount</span><span className='promo-discount-price'>-${'0'}</span></div>
                  </div>
                  <hr className='cart-right-divider mx-auto' />
                  <div className='d-flex flex-row align-items-center justify-content-between'><span className='cart-total-to-pay'>Total to Pay</span><span className='cart-total-amount'>${item.orderAmount}</span></div>
                </div>
              </div>
            </Fade>
            {/* order address & payment details ends here */}
          </div>

        }
      </div>

    </div>
  )
}
