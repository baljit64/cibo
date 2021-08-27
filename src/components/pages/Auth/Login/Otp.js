import { useState } from 'react'
import React from 'react'
import Logo from '../../../assets/logo.png'
import * as BiIcons from 'react-icons/bi'
import Slide from 'react-reveal/Slide';

import { Link } from 'react-router-dom'
function Otp() {
  return (
    <>
      <div className="login-form-back-btn  pb-3"><Link to='/signup' className="otp-back-btn" ><BiIcons.BiArrowBack /></Link></div>
      <div className="login-form w-100  otp-form">
        <Slide bottom>
          <div className="login-heading text-center">
            <span className="d-inline-block"> <img className="px-0 mb-3 login-logo" src={Logo} alt="logo" /></span>
            <h4>Verify your phone </h4>
            <p className="text-muted py-3 ">We sent OTP code to your phone</p>
          </div>
          <form>
            <div className="login-input-box mx-auto d-flex flex-column">
              <label className=" w-100 mb-3">
                <span className="field-icons"><BiIcons.BiLock /></span>
                <input className="login-fileds d-block w-100" placeholder="Enter your code" type="number" >
                </input>
              </label>
              <span className="login-btn">SUBMIT</span>
            </div>
          </form>
          <div>
            <p className="dont-have-account pt-3">Could't receive code ? <span>resend</span></p>
          </div>
        </Slide>
      </div>
    </>
  )
}
export default Otp
