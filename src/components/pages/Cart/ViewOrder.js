import './Cart.css'
import * as AiIcons from 'react-icons/ai'
import { useState, useEffect } from 'react'
import API from '../../Services/Api'
import { useSelector } from 'react-redux'
import Loader from '../Loaders/Spinner'
import Fade from 'react-reveal'
import { Modal, Button } from 'react-bootstrap'
import { FaStar } from "react-icons/fa";
import { Radio, Rating, Input } from "../Profile/RatingStyles";
export default function ViewOrder(props) {
  const token = useSelector(state => state.authReducer.token)
  const [data, setData] = useState(null)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  let headers = {
    Authorization: `Bearer ${token}`
  }
  const ApiCall = async () => {
    try {
      let result = await API.get(`/view_order/${props.match.params.id}`, { headers: headers })

      if (result.status === 200) {
        setData(result.data.data[0])
        setItems(result.data.data[0].all_item)
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
  }, [])
  const [seller_id, setSeller_id] = useState(null)
  const [order_id, setOrder_id] = useState(null)
  const [message, setMessage] = useState(null)
  const [star, setStar] = useState(null)
  const [eror, setEror] = useState('')
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const AddReview = (id1, id2) => {
    handleShow()
    setSeller_id(id1)
    setOrder_id(id2)
  }
  const postReview = async () => {
    let data = {
      seller_id, order_id, message, star
    }
    try {
      setEror('')
      let result = await API.post('/review', data, { headers: headers })
      if (result.status === 200) {
        console.log(result)
        ApiCall()
        handleClose()
        setStar(0)
        setMessage('')
        setLoading(false)
      }
    }
    catch (e) {
      if (e.response) {
        setLoading(false)
        setEror(e.response.data.message)
        console.log(e.response.data)
      }
    }
  }
  let oneStar = (
    <><AiIcons.AiFillStar />
      <AiIcons.AiOutlineStar />
      <AiIcons.AiOutlineStar />
      <AiIcons.AiOutlineStar />
      <AiIcons.AiOutlineStar />
    </>
  )
  let twoStar = (
    <><AiIcons.AiFillStar />
      <AiIcons.AiFillStar />
      <AiIcons.AiOutlineStar />
      <AiIcons.AiOutlineStar />
      <AiIcons.AiOutlineStar />
    </>
  )
  let threeStar = (
    <>
      <AiIcons.AiFillStar />
      <AiIcons.AiFillStar />
      <AiIcons.AiFillStar />
      <AiIcons.AiOutlineStar />
      <AiIcons.AiOutlineStar />
    </>
  )
  let fourStar = (
    <>
      <AiIcons.AiFillStar />
      <AiIcons.AiFillStar />
      <AiIcons.AiFillStar />
      <AiIcons.AiFillStar />
      <AiIcons.AiOutlineStar />

    </>
  )
  let fiveStar = (
    <>
      <AiIcons.AiFillStar />
      <AiIcons.AiFillStar />
      <AiIcons.AiFillStar />
      <AiIcons.AiFillStar />
      <AiIcons.AiFillStar />

    </>
  )

  let error = ''
  if (eror) {
    error = (
      <div className="alert alert-danger py-1 px-1">{eror}</div>
    )
  }
  if (loading) {
    return (
      <Loader />
    )
  }
  return (
    <div id="ViewOrder">
      <div className='container px-0'>
        <div className='cart-header px-2'>
          Order Detail
        </div>
        {
          items.length ? <div className='cart-wrap d-flex'>
            <div className='cart-left d-flex flex-column'>
              {
                items.length > 0 ?
                  items.map((item, index) =>
                    <div key={index}>
                      <Fade left>
                        <div className='cart-item d-flex flex-row'>
                          <div className='cart-img'><img src={item.item_image} />
                          </div>
                          <div className='cart-content pt-1  d-flex flex-column '>
                            <span className='cart-item-name pb-1'>{item.item_name}</span>

                            <span className='cart-item-quantity'>x{item.quantity}</span>
                          </div>
                          <div className='cart-price d-flex flex-column'>
                            {/* <span className='text-muted'>Item price</span> */}
                            <span className='cart-item-price'>${item.price}</span>

                          </div>
                        </div>
                      </Fade>
                      <hr className='bg-muted cart-divider-line mx-auto'></hr>
                    </div>
                  )
                  : "Your Cart is Empty......."
              }
              <div className='add-notes  d-flex flex-row justify-content-between align-items-center'>

                {data.order_status === "completed" && data.reviews ?
                  <>
                    <Fade left>
                      <label className=" review-order-label" htmlFor='notes'>You Reviewed</label>
                      <span className='review text-warning d-flex flex-row align-items-start'>
                        <span>{data.reviews === 1 ? oneStar : ''}{data.reviews === 2 ? twoStar : ''}{data.reviews === 3 ? threeStar : ''}{data.reviews === 4 ? fourStar : ''}{data.reviews === 5 ? fiveStar : ''}</span>

                      </span>
                    </Fade></> : ""
                }
                {data.order_status === "completed" && !data.reviews ?
                  <span onClick={() => AddReview(data.seller_id, data._id)} className="add-review-btn">Add Review</span> : ""}
              </div>
            </div>
            <Fade right>
              <div className='cart-right d-flex flex-column'>
                <div className='cart-adress d-flex flex-column'>
                  <span className='deliver-to'>Deliver To</span>
                  <span className='delivery-address'>{data.delivery_address}</span>
                </div>
                <hr className='cart-right-divider mx-auto' />
                <div className='cart-adress d-flex flex-column'>


                  <div className='d-flex flex-row px-1 py-2 align-items-center justify-content-between'>
                    <span className='deliver-to font-weight-bold'>Order Status</span> <span className='promo-discount  text-capitalize'>{data.order_status}</span>
                  </div>
                  <hr className='cart-right-divider mx-auto' />
                  <div className='charges-wrap'>
                    <div className='d-flex flex-row align-items-center justify-content-between'><span className='item-total'>Item Total</span><span className='item-total-price'>${data.Total_Pay}</span></div>
                    <div className='d-flex flex-row align-items-center justify-content-between'><span className='delivery-charges'>Delivery Charge</span><span className='delivery-charges-price'>${'0'}</span></div>
                    <div className='d-flex flex-row align-items-center justify-content-between'><span className='delivery-charges'>Service Charge</span><span className='delivery-charges-price'>${'0'}</span></div>
                    <div className='d-flex flex-row align-items-center justify-content-between'><span className='promo-discount'>Promo Discount</span><span className='promo-discount-price'>-${'0'}</span></div>
                  </div>
                  <hr className='cart-right-divider mx-auto' />
                  <div className='d-flex flex-row align-items-center justify-content-between'><span className='cart-total-to-pay'>Total to Pay</span><span className='cart-total-amount'>${data.Total_Pay}</span></div>
                </div>
              </div>
            </Fade>
          </div>
            : <div className='cart-nodata-msg d-flex justify-content-center align-items-center text-muted'>Your cart is empty</div>
        }
      </div>
      {/* model */}
      <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
        centered animation={false}>
        <Modal.Header className='model-header' closeButton>
          <Modal.Title className='add-review-heading'>Add Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error}
          <span>Rate this item.</span>
          <div className='d-flex flex-row'>
            {[...Array(5)].map((index) => {
              const givenRating = index + 1;
              return (
                <label style={{ marginRight: '10px', fontSize: '25px', paddingBottom: '10px' }}>
                  <Radio
                    type="radio"
                    value={givenRating}
                    onClick={() => {
                      setStar(givenRating);
                    }}
                  />
                  <Rating >
                    <FaStar
                      color={
                        givenRating < star || givenRating === star
                          ? "#FFD300"
                          : "rgb(192,192,192)"
                      }
                    />
                  </Rating>
                </label>
              );
            })}
          </div>
          <div className="d-flex flex-column">
            <label className="d-flex flex-column">Message
              <Input value={message} onChange={e => setMessage(e.target.value)} type="text" />
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" className="text-light" onClick={postReview}>
            Post
          </Button>
        </Modal.Footer>
      </Modal>
      {/* model ends here */}
    </div>
  )
}
