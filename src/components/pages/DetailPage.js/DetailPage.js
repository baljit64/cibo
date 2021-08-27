import React, { useState, useEffect } from 'react'
import './DetailPage.css'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io5'
import * as MdIcons from 'react-icons/md'
import * as HiIcons from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import API from '../../Services/Api'
import Fade from 'react-reveal'
import Loader from '../Loaders/Spinner'
import { Modal } from 'react-bootstrap'
function DetailPage(props) {
  let item_id = props.match.params.id
  const token = useSelector(state => state.authReducer.token)
  const mode = useSelector(state => state.getLocation.mode)
  let headers = {
    Authorization: `Bearer ${token}`
  }
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(true)
  const [data, setData] = useState([])
  const callApi = async () => {
    try {
      let result = await API.get(`/view_item1/${item_id}`, { headers: headers });
      if (result.status === 200) {
        if (result.data.result.length > 0) {
          setData(result.data.result[0])
        }
        setLoader(false)
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
    callApi();
  }, [])
  useEffect(() => {
    if (data === '') {
      return false;
    }
    else if (data.distance > 5.0) {
      setShow(true)
    }
  }, [data])
  const [quantity, setQuantity] = useState(0)
  const [total, setTotal] = useState(0)
  const [msg, setMsg] = useState('')
  const [processing, setProcessing] = useState(false)
  const [added, setAdded] = useState(false)
  const [special_instruction, setSpecial_instruction] = useState('')
  const increment = () => {
    setQuantity(quantity + 1)
  }
  const decrement = () => {
    if (quantity === 0) {
      return false
    }
    setQuantity(quantity - 1)
  }
  useEffect(() => {
    if (quantity === 0) {
      setTotal(0)
      return false;
    }
    setTotal(quantity * data.price)
  }, [quantity])

  const addtocartReq = async () => {
    let cartData = {
      item_id: data._id, quantity, order_type: !mode ? "delivery" : "pickup_only", seller_id: data.seller_id, special_instruction
    }

    try {
      setProcessing(true)
      let result = await API.post('/addToCart', cartData, { headers: headers })
      if (result.status === 200) {
        setProcessing(false)
        setMsg("SuccessFully Added to cart..")
        setAdded(true)

      }
    }
    catch (e) {
      if (e.response) {
        setProcessing(false)
        setMsg(e.response.data.message)
      }
    }
  }
  const addToCart = (e) => {
    setMsg('')
    e.preventDefault();
    if (quantity === 0) {

      setMsg('Plaese select quantity first.')
      return false;
    }
    addtocartReq();
  }

  if (loader) {
    return (
      <Loader />
    )
  }
  return (
    <div className='container'>
      <div className='detailPage-wrap'>
        <div className='flex-wrap'>
          <div className='detail-left'>
            <div className='item-header-right on-pic d-md-none d-flex flex-row'>
              <span> <IoIcons.IoShareSocialOutline className='share-icon' /></span>
              <span ><AiIcons.AiOutlineHeart className='item-detail-heart' /></span> </div>
            <Fade up>
              <img src={data.i_image} alt='Food' />
            </Fade>
          </div>
          <div className='detail-right'>
            <span className='text-danger alert-danger'>{msg}</span>
            <div className='item-content-section py-2'>
              <div className='item-content-header '>
                <Fade up>
                  <div className='d-flex flex-column item-header-left'>
                    <span className='item-name'>{data.item_name}</span>
                    <div className='d-flex flex-row seller-detail  pt-2 w-100'>
                      <div className='d-flex flex-row align-items-center' ><span className='item-by'>By </span>
                        <Link to={`/publicseller/${data.seller_id}/items`} className='item-by-name'>{data.seller_name}</Link></div>
                      <div className='d-flex flex-row align-items-center'>
                        {data.reviews ? <span className='mx-1 item-rating d-flex align-items-center py-2'>
                          <AiIcons.AiFillStar /> {data.reviews.toString().slice(0, 3)} </span> :
                          <span className='px-1 item-reviews'> No rating</span>
                        }
                        <span className='px-1 item-reviews'> {data.reviews_length} reviews</span>  <span className='mx-1 item-distance'><MdIcons.MdLocationOn className='item-distance-icon' /> {data.distance.toString().slice(0, 3)} km </span> </div>
                    </div>
                  </div>
                  <div className='item-header-right  d-md-flex d-none flex-row'>
                    <span> <IoIcons.IoShareSocialOutline className='share-icon' /></span>
                    <span ><AiIcons.AiOutlineHeart className='item-detail-heart' /></span> </div>
                </Fade>
              </div>
              <div className='item-content-body'>
                <Fade up>
                  <span className='item-features'>{data.description}
                  </span>
                  <span className='item-price'>₹ {data.price}</span>
                </Fade>
              </div>
            </div>
            <div className='quantity-area justify-content-between'>
              <Fade up>
                <div className='quantity-left d-flex flex-row align-items-center'>
                  <span className='quantity-label'>Quantity</span>
                  <span className='quantity-plus-minus-btn d-flex flex-row'>
                    <span onClick={decrement} className='plus-minus-btn'><HiIcons.HiMinusSm /></span>
                    <span className='quantity'>{quantity}</span>
                    <span onClick={increment} className='plus-minus-btn'><HiIcons.HiPlusSm /></span>
                  </span>

                </div>
                <div className='quantity-right d-flex flex-column'>
                  <span className='quantity-price-label'>Total</span>
                  <span className='quantity-price'>₹ {total}</span>
                </div>
              </Fade>
            </div>
            <div className='instruction-box py-3 d-flex flex-column'>
              <Fade up>
                <span className='instruction-heading'>Special Instructions (Optional)</span>
                <input onChange={e => setSpecial_instruction(e.target.value)} value={special_instruction} className='instruction' placeholder='Type here......' />
              </Fade>
            </div>
            <Fade right>
              <div className='add-tocard-btn-wrap'>
                {processing ? <span className='item-add-cart-btn '>Adding..</span> : <button onClick={addToCart} className={'item-add-cart-btn'}>Add to cart</button>}
                {/* <button onClick={removetoCart} className={added ? 'item-add-cart-btn' : "item-add-cart-btn"}>Remove</button> */}
              </div>
            </Fade>
          </div>
        </div>
      </div>
      <Modal
        show={show}
        // onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >

        <Modal.Body>
          <div className='px-3 py-5'>
            <span className='locationMsg text-muted'>Location of this item is too far.</span>
          </div>
        </Modal.Body>
        <Link style={{ textDecoration: 'none' }} className="ok-btn" to='/home' >Ok</Link>
      </Modal>
    </div >
  )
}

export default DetailPage
