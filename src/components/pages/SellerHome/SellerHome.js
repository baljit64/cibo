import React, { useState, useEffect } from 'react'
import './Styles.css'

import { NavLink } from 'react-router-dom'
import SwitchPages from './SwitchPages'
import { useSelector, useDispatch } from 'react-redux'
import * as FcIcons from 'react-icons/fc'
import * as GoIcons from 'react-icons/go'
import API from '../../Services/Api'
import Fade from 'react-reveal'
import { getMethod, postMethod } from '../../Services/Apicall'
import { sellerDeliveryMode, sellerPickUpMode } from '../../store/Constants'
import Error from '../Error/Error.js'
import { confirmAlert } from 'react-confirm-alert';
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

  const [error, setError] = useState('')
  let headers = {
    Authorization: `Bearer ${token}`
  }
  const DeliveryOption = async (d) => {
    let option = {
      delivery_option: d
    }
    const result = await postMethod('/seller', option, headers)
    if (result.status === 200) {
      viewSchedule()
    }
    else {
      setError(result)
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
      submit('To remove Delivery first select Pickup Mode')
      return false
    }
    dispatch(sellerDeliveryMode(e))
    setDelivery(e)

  }
  const ChangePickUpMode = (e) => {
    if (!delivery_mode && e === false) {
      submit('To remove Pickup first select Delivery Mode')
      return false
    }
    setPickUp(e)
    dispatch(sellerPickUpMode(e))
  }
  let date = new Date()
  const scheduleApi = async () => {
    let data = {
      start, end, date
    }
    const result = await postMethod('/schedule', data, headers)
    if (result.status === 200) {
      submit('Schedule Successfully  Updated...')
    }
    else {
      submit(result)
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

    const result = await getMethod('/view_delivery-option', headers)
    if (result.status === 200) {
      if (result.data.delivery_option[0] === "delivery" || result.data.delivery_option[1] === "delivery") {
        dispatch(sellerDeliveryMode(true))
      }
      else {
        dispatch(sellerDeliveryMode(false))
      }
      if (result.data.delivery_option[0] === "pickup_only" || result.data.delivery_option[1] === "pickup_only") {
        dispatch(sellerPickUpMode(true))
      }
      else {
        dispatch(sellerPickUpMode(false))
      }
    }

    else {
      setError(result)
    }
  }
  useEffect(() => {
    viewSchedule()
    viewDeliveryOption()
  }, [])
  const submit = (msg) => {
    confirmAlert({
      message: msg,
      buttons: [

        {
          label: 'Ok',
          onClick: () => { }
        }
      ]
    });
  }
  const updateSchedule = () => {
    if (start === null || end === null) {
      return false
    }
    else {
      scheduleApi()
    }
  }
  if (error) {
    return (
      <Error error={error} />
    )
  }
  return (
    <div className='container'>
      <div className='seller-home-wrap'>
        <div className='seller-home-header seller-headr px-2 bg-light mb-2'>
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
              <div className='d-flex flex-row align-items-center py-1'><span className=''>End time</span>
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
