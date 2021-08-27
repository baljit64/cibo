import React, { useState, useEffect } from 'react'
import './Styles.css'
import { Modal, Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import SwitchPages from './SwitchPages'
import { useSelector, useDispatch } from 'react-redux'
import * as FcIcons from 'react-icons/fc'
import * as GoIcons from 'react-icons/go'
import API from '../../Services/Api'
import Fade from 'react-reveal'

function SellerHome() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.authReducer.user)
  const token = useSelector(state => state.authReducer.token)
  const address = useSelector(state => state.getLocation.address)
  const delivery_mode = useSelector(state => state.getLocation.delivery)
  const pickup_mode = useSelector(state => state.getLocation.pickup_only)
  const [delivery, setDelivery] = useState(delivery_mode)
  const [pickUp, setPickUp] = useState(pickup_mode)
  const [start, setStart] = useState(null)
  const [end, setEnd] = useState(null)
  const [msg, setMsg] = useState('')
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  let headers = {
    Authorization: `Bearer ${token}`
  }
  const DeliveryOption = async (d) => {

    let option = {
      delivery_option: d
    }
    try {

      let result = await API.post('/seller', option, { headers: headers })
      if (result.status === 200) {
        viewSchedule()
      }
    }
    catch (e) {
      if (e.response) {
        console.log(e.response.data)
      }
    }
  }
  useEffect(() => {
    if (delivery && pickUp) {
      DeliveryOption(["delivery", "pickup_only"])
      return
    }
    else if (delivery && !pickUp) {
      DeliveryOption(["delivery"])
      return
    }
    else if (pickUp && !delivery) {
      DeliveryOption(["pickup_only"])
      return
    }

  }, [delivery, pickUp])

  const ChangeDeliveryMode = (e) => {
    if (!pickup_mode && e === false) {
      setMsg('To remove this select Another Field')
      setShow(true)
      return false
    }
    setDelivery(e)
    dispatch({
      type: 'SET_SELLER_MODE_DELIVERY',
      payload: e
    })
  }
  const ChangePickUpMode = (e) => {
    if (!delivery_mode && e === false) {
      setMsg('To remove this select Another Field')
      setShow(true)
      return false
    }
    setPickUp(e)
    dispatch({
      type: 'SET_SELLER_MODE_PICKUP',
      payload: e
    })
  }

  let date = new Date()
  const scheduleApi = async () => {

    let data = {
      start, end, date
    }
    try {
      let result = await API.post('/schedule', data, { headers: headers })
      if (result.status === 200) {
        setMsg('Schedule Updated Successfully..')
        setShow(true)
      }
    }
    catch (e) {
      if (e.response) {
        console.log(e.response.data)
      }
    }
  }

  const viewSchedule = async () => {
    try {
      let result = await API.get('/view_schedule', { headers: headers })
      if (result.status === 200) {
        setStart(result.data.delivery_option.start_time)
        setEnd(result.data.delivery_option.end_time)
      }
    }
    catch (e) {
      if (e.response) {
        console.log(e.response.data)
      }
    }
  }
  const viewDeliveryOption = async () => {
    try {
      let result = await API.get('/view_delivery-option', { headers: headers })
      if (result.status === 200) {

        if (result.data.delivery_option[0] === "delivery" || result.data.delivery_option[1] === "delivery") {
          dispatch({
            type: 'SET_SELLER_MODE_DELIVERY',
            payload: true
          })
        }
        else {
          dispatch({
            type: 'SET_SELLER_MODE_DELIVERY',
            payload: false
          })
        }
        if (result.data.delivery_option[0] === "pickup_only" || result.data.delivery_option[1] === "pickup_only") {
          dispatch({
            type: 'SET_SELLER_MODE_PICKUP',
            payload: true
          })
        }
        else {
          dispatch({
            type: 'SET_SELLER_MODE_PICKUP',
            payload: false
          })
        }
      }
    }
    catch (e) {
      if (e.response) {
        console.log(e.response.data)
      }
    }
  }
  useEffect(() => {
    viewSchedule()
    viewDeliveryOption()
  }, [])

  const updateSchedule = () => {
    if (start === null || end === null) {
      return false
    }
    else {

      scheduleApi()
    }
  }
  return (
    <div className='container'>
      <div className='seller-home-wrap'>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Message</Modal.Title>
          </Modal.Header>
          <div className='d-flex align-items-center model-wrap'>
            <span>{msg}</span>
          </div>
          <Modal.Footer>

            <Button variant="primary" onClick={handleClose}>
              ok
            </Button>
          </Modal.Footer>
        </Modal>
        <div className='seller-home-header'>
          <Fade up>
            <div className='seller-left-section'>
              <div className='seller-img'>
                <img src={user.image} alt='' />
              </div>
              <div className='seller-detail-box d-flex  flex-column py-2'>
                <div className='seller-name-tag d-flex flex-row align-items-center'>    <span className='seller-name'>{user.name}</span>
                  <span className='verify-tag'><FcIcons.FcApproval className='verified-tik' /> Verified</span></div>
                <span className='seller-adrress'><GoIcons.GoLocation className='seller-location-icon text-muted' />{address.slice(0, 20)}..</span>
                <span className='seller-page-bio'>{user.bio ? user.bio.slice(0, 40) + '...' : ''}</span>
                <div className='set-delivery-mode-wrap d-flex flex-row align-items-center pt-2'><div className='set-delivery-option'>Set Delivery option</div><div className='tik-boxes d-flex flex-row align-items-center'> <label class="checkbox-label">
                  <input onChange={() => ChangeDeliveryMode(!delivery_mode)} type="checkbox" checked={delivery_mode} />
                  <span class="checkbox-custom rectangular"></span>
                </label>
                  <span className='delivery-mode'>Delivery</span>
                  <label class="checkbox-label">
                    <input onChange={() => ChangePickUpMode(!pickup_mode)} type="checkbox" checked={pickup_mode} />
                    <span class="checkbox-custom  rectangular"></span>
                  </label> <span className='delivery-mode'>Pick up only </span>
                </div>
                </div></div>
            </div>
          </Fade>
          <Fade up>
            <div className='seller-right-section'>
              <span className=''></span>
              <span className='schedule-time-label'>Schedule Time</span>
              <div className='d-flex flex-row align-items-center'><span className=''>Start time</span>
                <input onChange={e => setStart(e.target.value)} value={start} type="time" id="appt" name="appt"
                  min="09:00" max="18:00" required /></div>
              <div className='d-flex flex-row align-items-center'><span className=''>End time</span>
                <input onChange={e => setEnd(e.target.value)} value={end} type="time" id="appt" name="appt"
                  min="09:00" max="18:00" required /></div>
              <div className='d-flex mt-1 mb-3'><button onClick={updateSchedule} className='update-schedule-btn'>update Schedule</button></div>
            </div>
          </Fade>
        </div>


        <div className='seller-body'>
          <Fade up>
            <div className='seller-body-left d-none d-md-block'>
              <NavLink to='/seller/orders' activeClassName='active-seller-nested-link' className='seller-page-nav'><span>Orders</span><span></span></NavLink>
              <NavLink to='/seller/items' activeClassName='active-seller-nested-link' className='seller-page-nav'>Items</NavLink>
              {/* <NavLink to='/seller/reviews' activeClassName='active-seller-nested-link' className='seller-page-nav'>Rewiews</NavLink> */}
            </div>
            <div className='mobile-seller-nav-links my-2 d-flex flex-row d-md-none '>
              <NavLink to='/seller/orders' activeClassName='active-seller-link' >Orders</NavLink>
              <NavLink to='/seller/items' activeClassName='active-seller-link'>Items</NavLink>

              {/* <NavLink to='/seller/reviews' activeClassName='active-seller-link'>Reveiws</NavLink> */}
            </div>
            <div className='seller-body-right'>
              <SwitchPages />
            </div>
          </Fade>
        </div>
      </div>
    </div>
  )
}

export default SellerHome