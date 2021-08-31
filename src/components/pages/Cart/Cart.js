import React from 'react'
import './Cart.css'
import * as RiIcons from 'react-icons/ri'
import * as BiIcons from 'react-icons/bi'
import percentage from '../../assets/promo.png'
import { useState, useEffect } from 'react'
import API from '../../Services/Api'
import Fade from 'react-reveal'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../Loaders/Spinner'
import { Link } from 'react-router-dom'
function Cart() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.authReducer.token)
  let headers = {
    Authorization: `Bearer ${token}`
  }
  const [loader, setLoader] = useState(true)
  const [cartData, setCartData] = useState([])
  const [cartItems, setCartItems] = useState([])
  const viewCart = async () => {
    try {
      setLoader(true)
      let result = await API.get('/ViewaddToCart', { headers: headers })
      if (result.status === 200) {
        setLoader(false)
        setCartData(result.data)
        setCartItems(result.data.message)
        dispatch({
          type: 'SET_AMOUNT',
          payload: result.data.total_pay
        })
      }
    }
    catch (e) {
      if (e.response) {
        setLoader(false)
        console.log(e.response.data)
      }
    }
  }
  useEffect(() => {
    viewCart();
  }, [])


  const deliveryTime = (index) => {
    let x = document.querySelectorAll('.delivery-time-btn');
    x[index === 1 ? 1 : 0].classList.remove('priority')
    x[index === 1 ? 0 : 1].classList.add('priority')
    if (index === 1) {
      dispatch({
        type: 'SET_DELIVERY_TIME',
        payload: 'priority'
      })

    }
    else {
      dispatch({
        type: 'SET_DELIVERY_TIME',
        payload: 'standard'
      })

    }
  }

  const removetoCart = async (item_id) => {
    try {
      let result = await API.delete(`/delete_addToCart/${item_id}`, { headers: headers });
      if (result.status === 200) {
        viewCart()
      }
    }
    catch (e) {
      if (e.response) {
        console.log(e.response.data)
      }
    }
  }

  if (loader) {
    return (
      <Loader />
    )
  }
  return (
    <div id="cartPage">
      <div className='container px-0'>
        <div className='cart-header px-2'>
          My cart
        </div>
        {
          cartItems.length ? <div className='cart-wrap d-flex'>
            <div className='cart-left d-flex flex-column'>
              {
                cartItems.length > 0 ?
                  cartItems.map((item, index) =>
                    <div key={index}>
                      <Fade left>
                        <div className='cart-item d-flex flex-row'>
                          <div className='cart-img'><img src={item.i_image} alt='' />
                          </div>
                          <div className='cart-content pt-1  d-flex flex-column '>
                            <span className='cart-item-name pb-1'>{item.i_name}</span>
                            <span className='d-none flex-row  py-1 align-items-center' ><span className='cart-item-by'>by</span><span className='cart-item-by-name'>john williams</span></span>
                            <span className='cart-item-quantity'>x{item.quantity}</span>
                          </div>
                          <div className='cart-price d-flex flex-column'>
                            <span className='cart-item-price'>${item.price}</span>
                            <span onClick={() => removetoCart(item.item_id)} className='cart-item-delte'><RiIcons.RiDeleteBin6Line /></span>
                          </div>
                        </div>
                      </Fade>
                      <hr className='bg-muted cart-divider-line mx-auto'></hr>
                    </div>
                  )
                  : "Your Cart is Empty......."
              }
              <Fade left>
                <div className='add-notes d-flex flex-column'>
                  <label htmlFor='notes'>Add Notes</label>
                  <input className='notes-input' name='notes' />
                </div>
              </Fade>
            </div>
            <Fade right>
              <div className='cart-right d-flex flex-column'>
                <div className='cart-adress d-flex flex-column'>
                  <span className='deliver-to'>Deliver To</span>
                  <span className='delivery-address'>{cartData.delivery_address}</span>
                </div>
                <hr className='cart-right-divider mx-auto' />
                <div className='cart-adress d-flex flex-column'>
                  <span className='deliver-to'>Deliver Time</span>
                  <div className='d-flex flex-row px-1 py-3'>
                    <div className='w-50'>
                      <button onClick={() => deliveryTime(1)} className='delivery-time-btn'>Priority</button>
                    </div>
                    <div className='w-50'>
                      <button onClick={() => deliveryTime(2)} className='delivery-time-btn priority'>Standard</button>
                    </div>
                  </div>
                  <div className='apply-promo-code px-2 my-3'>
                    <div className='d-flex flex-row justify-content-between align-items-center py-2 px-3'>
                      <div className='d-flex flex-row align-items-center'>
                        <img className='percentage-pic' src={percentage} alt='' />
                        <span className='promo-text'>Apply promo code</span>
                      </div>
                      <div ><BiIcons.BiChevronRight className='promo-arrow' /></div>
                    </div>
                  </div>
                  <div className='charges-wrap'>
                    <div className='d-flex flex-row align-items-center justify-content-between'><span className='item-total'>Item Total</span><span className='item-total-price'>${cartData.total_pay}</span></div>
                    <div className='d-flex flex-row align-items-center justify-content-between'><span className='delivery-charges'>Delivery Charge</span><span className='delivery-charges-price'>${'0'}</span></div>
                    <div className='d-flex flex-row align-items-center justify-content-between'><span className='delivery-charges'>Service Charge</span><span className='delivery-charges-price'>${'0'}</span></div>
                    <div className='d-flex flex-row align-items-center justify-content-between'><span className='promo-discount'>Promo Discount</span><span className='promo-discount-price'>-${'0'}</span></div>
                  </div>
                  <hr className='cart-right-divider mx-auto' />
                  <div className='d-flex flex-row align-items-center justify-content-between'><span className='cart-total-to-pay'>Total to Pay</span><span className='cart-total-amount'>${cartData.total_pay}</span></div>
                  <hr className='cart-right-divider mx-auto' />
                  <div className='mx-auto mt-2 py-3'>
                    <Link to='/pay' className='procced-to-pay-btn'>PROCEED TO PAY</Link>
                  </div>
                </div>
              </div>
            </Fade>
          </div>
            : <div className='cart-nodata-msg d-flex justify-content-center align-items-center text-muted'>Your cart is empty</div>
        }
      </div>
    </div>
  )
}

export default Cart

