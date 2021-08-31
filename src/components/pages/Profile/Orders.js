import React, { useState, useEffect } from 'react'
import Fade from 'react-reveal'
import { Link } from 'react-router-dom'
import * as AiIcons from 'react-icons/ai'
import { useSelector } from 'react-redux'
import API from '../../Services/Api'
import Loader from '../Loaders/Spinner'
import { Modal, Button } from 'react-bootstrap'
import { FaStar } from "react-icons/fa";
import { Radio, Rating, Input } from "./RatingStyles";
function Orders() {
  const token = useSelector(state => state.authReducer.token)
  let headers = {
    Authorization: `Bearer ${token}`
  }
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const apiCall = async () => {
    try {
      let result = await API.get('/My_order', { headers: headers })
      if (result.status === 200) {
        setData(result.data.data)
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
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    apiCall()
  }, [])
  const [seller_id, setSeller_id] = useState(null)
  const [order_id, setOrder_id] = useState(null)
  const [message, setMessage] = useState(null)
  const [star, setStar] = useState(null)
  const [eror, setEror] = useState('')
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
        apiCall()
        handleClose()
        setStar(0)
        setMessage('')
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
  const cancelOrder = async (id) => {
    let data = {
      order_id: id
    }
    try {
      setEror('')
      let result = await API.post('/cancel_order_for_user', data, { headers: headers })
      if (result.status === 200) {
        apiCall()
      }
    }
    catch (e) {
      if (e.response) {
        console.log(e.response.data)
      }
    }
  }
  if (loading) {
    return (
      <Loader />
    )
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
  return (
    <div className='container'>
      <div className='order-form'>
        <div className='order-header pb-2 d-flex  align-items-center flex-row'>
          <span className='active-order-btn'>Post Orders</span>
          {/* <span className='mx-3'>Completed</span>
          <span>Canceled</span> */}
        </div>
        <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
          centered animation={false}>
          <Modal.Header className='model-header' closeButton>
            <Modal.Title className='add-review-heading'>Add Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error}
            <span>Rate this item.</span>
            <div className='d-flex flex-row'>
              {[...Array(5)].map((item, index) => {
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
        {
          data.length > 0 ?
            data.map((item, i) =>
              <div key={i} className='orderCard'>
                <Fade up>
                  <div className='order-first-wrap'>
                    <div className='order-detail-wrap'>
                      <div className='order-card-img'> <img className='w-100' src={item.item_Image} alt='food' /></div>
                      <div className=' order-card-detail'>
                        <span className='order-card-name'>{item.item_Name}</span>
                        <span className='order-card-items-name py-1'>by   <span> {item.seller_name}</span> </span>
                        <div className='d-flex flex-row'>
                          <span className='order-card-date '>{item.date.slice(0, 10)}</span>
                          {item.order_status === 'completed' ?
                            <span className='completed-btn mx-1'>Completed</span>
                            : ''}
                          {
                            item.order_status === 'pending' ? <span className='progress-btn mx-2'>Pending</span> : ''
                          }
                          {
                            item.order_status === 'cancel' ? <span className='canceled-order-status  mx-2'>Canceled</span> : ''
                          }
                        </div>
                      </div>
                    </div>
                    <div className='order-card-status'>
                      <span className='order-number py-2'>ID {item.order_number}</span>
                      {item.reviews ? <span className='review-done d-flex flex-column align-items-end'>
                        <span>{item.reviews === 1 ? oneStar : ''}{item.reviews === 2 ? twoStar : ''}{item.reviews === 3 ? threeStar : ''}{item.reviews === 4 ? fourStar : ''}{item.reviews === 5 ? fiveStar : ''}</span>
                        <span>You reviewed</span>
                      </span> : ''
                      }
                      {!item.reviews && item.order_status === 'completed' ?
                        <span onClick={() => AddReview(item.seller_id, item._id)} className='order-card-detail-link'>Add Rewiews</span>
                        : ''}
                    </div>
                  </div>
                  <hr className='order-card-divider mx-auto' />
                  <div className='order-card-footer d-flex felx-row align-items-center justify-content-between'>
                    <div className='d-flex flex-column align-items-start'>
                      <span className='total-amount'>Total Payment</span>
                      <span className='order-card-amount'>${item.orderAmount}</span>
                    </div>
                    <div className='d-flex flex-row'>
                      {
                        item.order_status === 'pending' ? <span onClick={() => cancelOrder(item._id)} className='help-btn'>cancel</span> : ''
                      }
                      {
                        item.order_status === 'track' ? <span className='help-btn'>Track</span> : ''
                      }
                      <Link to={`/order/${item._id}`} className='reorder-btn text-center'>View Order</Link>
                    </div>
                  </div>
                </Fade>
              </div>
            )
            : <div className='order-empty-msg  d-flex justify-content-center align-items-center' >Your order list is Empty</div>}
      </div>
    </div>
  )
}

export default Orders
