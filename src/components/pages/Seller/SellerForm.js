import React, { useState } from 'react'
import './Styles.css'
import panbg from '../../assets/pan.svg'
import adharFront from '../../assets/adharfront.svg'
import adharBack from '../../assets/adharback.svg'
import { useSelector } from 'react-redux'
import API from '../../Services/Api'
import Fade from 'react-reveal'
import { Redirect } from 'react-router-dom'
function SellerForm() {
  const token = useSelector(state => state.authReducer.token)
  let headers = {
    Authorization: `Bearer ${token}`
  }

  const [panUrl, setPanUrl] = useState(null)
  const [adharfrontUrl, setAdharfrontUrl] = useState(null)
  const [adharBackUrl, setAdharBackUrl] = useState(null)
  const [pan_card, setPan_card] = useState('')
  const [pan_Image, setPan_Image] = useState('')
  const [adharfrontSide, setAdharFrontSide] = useState('')
  const [adharBackSide, setAdharBackSide] = useState('')
  const [adhaar_card, setAdhaar_card] = useState('')
  const [street_name, setStreet_name] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [pin, setPin] = useState('')
  const [process, setProcess] = useState(false)

  // error msgs
  const [panMsg, setPanMsg] = useState('')
  const [panImageMsg, setPanImageMsg] = useState('')
  const [adharMsg, setAdharMsg] = useState('')
  const [adharImg1Msg, setAdharImg1Msg] = useState('')
  const [adharImg2Msg, setAdharImg2Msg] = useState('')
  // address
  const [streetMsg, setStreetMsg] = useState('')
  const [cityMsg, setCityMsg] = useState('')
  const [stateMsg, setStateMsg] = useState('')
  const [pinMsg, setPinMsg] = useState('')
  // end of all error msg
  const [nextPage, setNextPage] = useState(false)
  // reset all error msgs
  const reset = () => {
    // pan detail
    setPanMsg('')
    setPanImageMsg('')
    // adhaar
    setAdharMsg('')
    setAdharImg1Msg('')
    setAdharImg2Msg('')
    //  address
    setStreetMsg('')
    setCityMsg('')
    setStateMsg('')
    setPinMsg('')
  }

  // validation for input data
  const validation = () => {

    if (pan_card.length < 10) {
      setPanMsg('Length Must be 10 Digits.');
      if (pan_card === '') {
        setPanMsg('Required')
      }
      return false;
    }
    else if (!pan_card.match(/^[a-zA-Z]+[0-9]+[a-zA-Z]+$/)) {
      setPanMsg('Invalid')
    }
    else if (!pan_Image) {
      setPanImageMsg('Required');
      return false;
    }
    else if (adhaar_card.length < 12) {
      setAdharMsg('Length Must be 12 Digits.')
      if (!adhaar_card) {
        setAdharMsg('Required.')
      }
      return false;
    }
    else if (!adharfrontSide) {
      setAdharImg1Msg('Required');
      return false;
    }
    else if (!adharBackSide) {
      setAdharImg2Msg('Required');
      return false;
    }
    else if (street_name === '') {
      setStreetMsg('Required');
      return false;
    }
    else if (city === '') {
      setCityMsg('Required');
      return false;
    }
    else if (state === '') {
      setStateMsg('Required')
      return false;
    }
    else if (pin.length < 6) {
      setPinMsg('Must be 6 digits')
      if (!pin) {
        setPinMsg('Required.')
      }
      return false;
    }
    else {

      return true
    }
  }

  const panImg = (e) => {
    setPan_Image(e.target.files[0])
    setPanUrl(URL.createObjectURL(e.target.files[0]))
  }
  const adharImg1 = (e) => {
    setAdharFrontSide(e.target.files[0])
    setAdharfrontUrl(URL.createObjectURL(e.target.files[0]))
  }
  const adharImg2 = (e) => {
    setAdharBackSide(e.target.files[0])
    setAdharBackUrl(URL.createObjectURL(e.target.files[0]))
  }
  const proceed = async (e) => {
    e.preventDefault()
    reset();
    let fd = new FormData()
    fd.append('street_name', street_name)
    fd.append('city', city)
    fd.append('state', state)
    fd.append('pin', pin)
    fd.append('adhaar_card', adhaar_card)
    fd.append('adhaar_front', adharfrontSide)
    fd.append('adhaar_back', adharBackSide)
    fd.append('pan_Image', pan_Image)
    fd.append('pan_card', pan_card)
    if (validation()) {
      setProcess(true)
      try {
        let res = await API.post('/seller', fd, { headers: headers });
        if (res.status === 200) {
          setProcess(false)
          setNextPage(true)
        }
        console.log(res)
      }
      catch (e) {
        if (e.response) {
          setProcess(false)
          // console.log(e.response.data)
        }
      }
    }
  }
  const emptyAdharBack = () => {
    setAdharBackUrl(null)
    setAdharBackSide('')
  }

  const emptyPanImage = () => {
    setPanUrl(null)
    setPan_Image('')
  }
  const emptyAdharFront = () => {
    setAdharfrontUrl(null)
    setAdharFrontSide('')
  }

  if (nextPage) {
    return <Redirect to='/profile/bank' />
  }
  return (
    <div className='seller-form'>
      <form>
        <Fade right>
          <div className='seller-header py-2 px-3'>Become A Seller   </div>
        </Fade>
        <div className="seller-form-wrap px-3">
          <Fade right>
            <div className='seller-left d-flex flex-column'>
              <label htmlFor="pan">PAN CARD Number</label>
              <input type="text" placeholder='PAN Card No.' name='pan' value={pan_card} onChange={e => setPan_card(e.target.value = e.target.value.slice(0, 10))} className='text-uppercase seller-form-inputs' />
              <span className="text-danger px-1 errorMsg bold">{panMsg}</span>
              <div className='width-45 seller-form-img-box'>
                <img className='seller-doc-image' alt='' src={panUrl ? panUrl : panbg} />
                <input onChange={e => e.target.files.length > 0 ? panImg(e) : emptyPanImage()} className="file-input" accept=".jpg,.png" type="file" />
              </div>
              <span className="text-danger px-1 imageMsg bold">{panImageMsg}</span>
            </div>
          </Fade>
          <Fade right>
            <div className='seller-right d-flex flex-column'>

              <label htmlFor="adhar">Adhar Number</label>
              <input type="number" onChange={e => setAdhaar_card(e.target.value = e.target.value.slice(0, 12))} value={adhaar_card} placeholder='Adhar Number' className='seller-form-inputs' name='adhar' />
              <span className="text-danger errorMsg bold">{adharMsg}</span>
              <div className='w-100 d-flex flex-row justify-content-between'>
                <div className='width-45 d-flex flex-column'>
                  <div className='seller-form-img-box'>
                    <img alt='' src={adharfrontUrl ? adharfrontUrl : adharFront} className='seller-doc-image' />
                    <input onChange={e => e.target.files.length > 0 ? adharImg1(e) : emptyAdharFront()} className="file-input" accept=".jpg,.png" type="file" required />
                  </div>
                  <span className="text-danger  px-2 imageMsg">{adharImg1Msg}</span>
                </div>
                <div className='width-45 d-flex flex-column'>
                  <div className='seller-form-img-box'>
                    <img src={adharBackUrl ? adharBackUrl : adharBack} className='seller-doc-image' alt='' />
                    <input onChange={e => e.target.files.length > 0 ? adharImg2(e) : emptyAdharBack()} className="file-input" type="file" accept=".jpg,.png" required />
                  </div>
                  <span className="text-danger  px-2 imageMsg">{adharImg2Msg}</span>
                </div>

              </div>

            </div>
          </Fade>
        </div>

        <Fade right>  <div className='physical-address py-2 px-3'>Physical Address</div></Fade>
        <div className="seller-form-wrap px-3">
          <Fade right>
            <div className='seller-left d-flex flex-column'>

              <label htmlFor="pan">Street Name</label>
              <input type="text" onChange={e => setStreet_name(e.target.value)} value={street_name} placeholder='Street Name' name='pan' className='seller-form-inputs' />
              <span className="text-danger errorMsg bold">{streetMsg}</span>
              <label htmlFor="pan">STATE</label>
              <input type="text" onChange={e => setState(e.target.value)} value={state} placeholder='STATE' name='pan' className='seller-form-inputs' />
              <span className="text-danger errorMsg bold">{stateMsg}</span>

            </div>
          </Fade><Fade right>
            <div className='seller-right d-flex flex-column'>

              <label htmlFor="adhar">City</label>
              <input type="text" onChange={e => setCity(e.target.value)} value={city} placeholder='City' className='seller-form-inputs' name='adhar' />
              <span className="text-danger errorMsg bold">{cityMsg}</span>
              <label htmlFor="pan">PIN</label>
              <input type="number" onChange={e => setPin(e.target.value = e.target.value.slice(0, 6))} value={pin} placeholder='PIN' name='pan' className='seller-form-inputs' />
              <span className="text-danger errorMsg bold">{pinMsg}</span>

            </div>   </Fade>
        </div>
        <div className="px-3 py-3 w-100 d-flex justify-content-end">

          {process ? <span className='seller-form-proceed-btn'>Proceeding...</span> :
            <button onClick={proceed} type="submit" className='seller-form-proceed-btn'>PROCEED</button>}

        </div>
      </form>
    </div>
  )
}

export default SellerForm
