import React, { useState } from 'react'
import './Styles.css'
import Fade from 'react-reveal'
import { Link, Redirect } from 'react-router-dom'
import API from '../../Services/Api'
import { useSelector } from 'react-redux'
import { Modal } from 'react-bootstrap'

function BankDetails() {
  const token = useSelector(state => state.authReducer.token)
  let headers = {
    Authorization: `Bearer ${token}`
  }
  const [account_number, setAccount_number] = useState('')
  const [account_holder_name, setAccount_holder_name] = useState('')
  const [ifse, setIfse] = useState('')
  const [bank_name, setBank_name] = useState('')
  // const [process, setProcess] = useState(false)
  // next page
  const [nextPage, setNextPage] = useState(false)

  // error msgs
  const [acMsg, setAcMsg] = useState('')
  const [holderMsg, setHolderMsg] = useState('')
  const [ifseMsg, setIfseMsg] = useState('')
  const [bankMsg, setbankMsg] = useState('')
  // reset error msgs
  const reset = () => {
    setAcMsg("")
    setHolderMsg("")
    setIfseMsg("")
    setbankMsg("")
  }

  // bootstrap model
  const [show, setShow] = useState(false);


  const validation = () => {
    if (!account_number && !account_holder_name && !ifse && !bank_name) {
      setAcMsg("Required")
      setHolderMsg("Required")
      setIfseMsg("Required")
      setbankMsg("Required")
      return false
    }
    else if (account_number.length < 10) {
      setAcMsg('Must be 10 digits.')
      if (!account_number) {
        setAcMsg('Required')
      }
    }
    else if (account_holder_name.length < 5) {
      setHolderMsg('Must be 5 Characters.')
      if (!account_holder_name) {
        setHolderMsg('Required')
      }
    }
    else if (ifse.length < 11) {
      setIfseMsg('Must be 11 Characters.')
      if (!ifse) {
        setIfseMsg('Required')
      }
    }
    else if (!ifse.match(/^[a-z0-9]+$/)) {
      setIfseMsg('Not Valid')
    }
    else if (!bank_name) {
      setbankMsg('Required')


    }
    else {
      return true
    }
  }
  const submit = async (e) => {
    e.preventDefault();
    reset()
    let data = {
      account_number, account_holder_name, ifse, bank_name
    }

    if (validation()) {
      try {
        let result = await API.post('/seller', data, { headers: headers })
        if (result.status === 200) {
          setShow(true)
        }

      }
      catch (e) {
        if (e.response) {
          console.log(e.response.data)
        }
      }
    }
  }

  const [bio, setBio] = useState('')
  const [bioMsg, setBioMsg] = useState('')
  const submitBio = async (e) => {
    e.preventDefault()
    if (bio === '') {
      setBioMsg('please fill field..')
    }
    else {
      let data = {
        bio
      }
      try {
        let result = await API.post('/seller', data, { headers: headers })
        if (result.status === 200) {
          setNextPage(true)
        }
      }
      catch (e) {
        if (e.response) {
          console.log(e.response.data)
        }
      }
    }
  }
  if (nextPage) {
    return (
      <Redirect to='/seller/orders' />
    )
  }
  return (
    <div className='seller-form'>
      <form>
        <Fade right>
          <div className='seller-header py-2 px-3'>Become A Seller</div>
        </Fade>
        <Fade right>  <div className='physical-address py-2 px-3'>Bank Account Details</div></Fade>
        <div className="seller-form-wrap px-3">
          <Fade right>
            <div className='seller-left d-flex flex-column'>

              <label htmlFor="account">Account Number</label>
              <input type="number" onChange={e => setAccount_number(e.target.value = e.target.value.slice(0, 10))} value={account_number} placeholder='Account Number' name='account' className='seller-form-inputs' />
              <span className="text-danger errorMsg1 bold">{acMsg}</span>
              <label htmlFor="pan">IFSE Code</label>
              <input type="text" onChange={e => setIfse(e.target.value = e.target.value.slice(0, 11))} value={ifse} placeholder='IFSE Code' name='pan' className='text-uppercase seller-form-inputs' />
              <span className="text-danger errorMsg1 bold">{ifseMsg}</span>

            </div>
            <div className='seller-right d-flex flex-column'>

              <label htmlFor="holdername">Account Holder Name</label>
              <input type="text" onChange={e => setAccount_holder_name(e.target.value)} value={account_holder_name} placeholder='Account Holder Name' className='seller-form-inputs' name='holdername' />
              <span className="text-danger errorMsg1 bold">{holderMsg}</span>
              <label htmlFor="bankName">Bank Name</label>
              <input type="text" onChange={e => setBank_name(e.target.value)} value={bank_name} placeholder='Bank Name' name='bankName' className='seller-form-inputs' />
              <span className="text-danger errorMsg1 bold">{bankMsg}</span>

            </div>
          </Fade>
          {/* = e.target.value.slice(0, 6) */}
        </div>
        <Fade right>
          <div className='px-3 py-1 term-conditions  d-flex flex-row align-items-center'>
            <input required className='bank-checkbox' type='checkbox' />
            <span>I agree to the <Link to='#'>Terms & conditions</Link></span>
          </div>
        </Fade>
        <div className="px-3 py-3 w-100 d-flex justify-content-end">

          {process ?
            <button type="submit" onClick={submit} className='seller-form-proceed-btn'>SUBMIT</button> :
            <span className='seller-form-proceed-btn'>Submitting...</span>}

        </div>
      </form>

      {/* model */}
      <Modal
        show={show}
        // onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >

        <Modal.Body>
          <form>
            <div className="px-2 mb-4 seller-home-heading text-center w-100">
              Seller  Home
            </div>
            <span className="model-span text-muted">
              Your Lonosh account is verified. Please Describe yourself
            </span>
            <br />

            <div className='py-3 model-content-box d-flex flex-column'>

              <label htmlFor='bio'>Bio</label>
              <input className='model-bio-input' onChange={e => setBio(e.target.value)} type='text' value={bio} name='bio' placeholder='Bio' />
              <span className='text-danger bioMsg py-3 px-3'>{bioMsg}</span>
            </div>
            <div className='text-center pt-4 mb-3 mx-auto'>
              <button type="submit" onClick={submitBio} className='model-button'>SUBMIT</button>
            </div>

          </form>
        </Modal.Body>

      </Modal>
    </div>
  )
}

export default BankDetails

