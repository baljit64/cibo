import { useState } from 'react'
import './Login.css'
import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../../assets/logo.png'
import * as RiIcons from 'react-icons/ri'
import * as IoIcons from 'react-icons/io'
import * as HiIcons from 'react-icons/hi'
import * as BiIcons from 'react-icons/bi'
import * as MdIcons from 'react-icons/md'
import * as BsIcons from 'react-icons/bs'

import Slide from 'react-reveal/Slide';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { useDispatch } from 'react-redux'
import { SET_TOKEN } from '../../../store/Constants'
import API from '../../../Services/Api'


function SignUp() {
  const [errMsg, setErrMsg] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone_number, setPhone_number] = useState('')
  const [password, setPassword] = useState('')
  const [confirm_p, setConfirm_p] = useState('')

  const dispatch = useDispatch()
  const SignUP_API = async (e) => {
    setErrMsg('')
    if (signupValid()) {
      let signupData = {
        email,
        name,
        phone_number,
        password,
        confirm_p
      }
      console.log(signupData)
      try {
        let result = await API.post('/user', signupData)
        if (result.status === 200) {
          console.log(result)
          dispatch({
            type: SET_TOKEN,
            payload: result.data.token
          })
        }
      }
      catch (e) {
        if (e.response) {
          console.log(e.response.data)
          if (e.response.data.message === 'Error while storing data' && e.response.data.err.code === 11000) {
            setErrMsg('Email Already in Use')
          }
          else if (e.response.data.message === 'Error while storing data' && e.response.data.err.errors.phone_number) {
            setErrMsg('Invalid Phone number')
          }
          else {
            setErrMsg('Something Went Wrong....')
          }
        }
      }
    }
  }
  const signupValid = () => {

    if (email === '' || name === '' || phone_number === '' || password === '' || confirm_p === '') {
      setErrMsg('All fields are required.')
      return false;
    }
    else if (!email.includes('@gmail.com')) {
      setErrMsg('Please fill valid email address')
      return false
    }
    else if (phone_number.length < 10) {
      setErrMsg('phone number must be 10 digits.')
      return false
    }

    else if (password !== confirm_p) {
      setErrMsg('Password must be Same.')
      return false
    }
    else if (password.length < 6 || confirm_p.length < 6) {
      setErrMsg('Password must be atleast 6 characters.')
      return false
    }
    else {
      return true
    }
  }
  // facebook Google
  const responseFacebook = async (response) => {
    if (response.status) {
      console.log(response.status)
    }
    else {
      console.log(response)
      let facebookRes = {
        name: response.name,
        facebook_id: response.name,
        type: 'facebook'
      }
      try {
        let result = await API.post('/login', facebookRes)
        console.log(result)
      }
      catch (e) {
        console.log(e)
      }
      // console.log(facebookRes)
      // dispatch({
      //   type: SET_USER_DETAIL,
      //   payload: facebookRes
      // })
    }
  }
  const responseGoogle = async (response) => {
    let res = response.profileObj;
    let googleRes = {
      email: res.email,
      name: res.name,
      type: 'google',
      google_id: res.googleId

    }
    try {
      let result = await API.post('/login', googleRes)
      if (result.status === 200) {
        dispatch({
          type: SET_TOKEN,
          payload: result.data.token
        })
      }

    }
    catch (e) {
      if (e.response) {
        console.log(e.response.data)
      }
    }
  }


  return (
    <>
      <div className="login-form w-100">
        <span className="text-center pt-1"> <img className="login-logo" src={Logo} alt="logo" /></span>
        <div className="login-heading">
          <h4>Sign up here.</h4>
        </div>
        <form>
          <div className="login-input-box  pt-2 mx-auto d-flex flex-column">
            <p className='text-left text-danger'>{errMsg}</p>
            <Slide bottom>
              <label className="w-100">
                <span className="field-icons"><BsIcons.BsFillPersonFill /></span>
                <input className="login-fileds d-block w-100" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" type="text" />
              </label>
              <label className="w-100">
                <span className="field-icons"><HiIcons.HiOutlineMail /></span>
                <input className="login-fileds d-block w-100" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" />
              </label>
              <label className=" w-100">
                <span className="field-icons"><MdIcons.MdCall /></span>
                <input className="login-fileds d-block w-100" value={phone_number}
                  onInput={(e) => e.target.value = e.target.value.slice(0, 10)}
                  maxLength="10" onChange={(e) => setPhone_number(e.target.value)} placeholder="Phone Number" type="number" >
                </input>
              </label>
              <label className=" w-100">
                <span className="field-icons"><BiIcons.BiLock /></span>
                <input className="login-fileds d-block w-100" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" >
                </input>
              </label>
              <label className=" w-100">
                <span className="field-icons"><BiIcons.BiLock /></span>
                <input className="login-fileds d-block w-100" value={confirm_p} onChange={(e) => setConfirm_p(e.target.value)} placeholder="Confirm Password" type="password" >
                </input>
              </label>
            </Slide>
            <span onClick={SignUP_API} className="mt-2 d-flex flex-row justify-content-center align-items-center signup-next-btn">NEXT
              <BiIcons.BiChevronRight className="icon" /> </span>
          </div>
        </form>
        <p className="text-center py-2 text-muted">or Sign up with.</p>
        <div className="Login-create-account-links mb-2  d-flex flex-row justify-content-center">
          <span >
            <GoogleLogin
              clientId="349622308448-nlb4kklf6o42k11tcfg97tes8tm1gqkk.apps.googleusercontent.com"
              render={renderProps => (
                <button className='googleSignbtn my-auto d-flex place-items-center justify-content-center'
                  onClick={renderProps.onClick} disabled={renderProps.disabled}><IoIcons.IoLogoGoogleplus /></button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          </span>
          <FacebookLogin
            appId="177947814396366"
            fields="name,email,picture"
            callback={responseFacebook}
            textButton={<RiIcons.RiFacebookFill />}
            cssClass=" googleSignbtn my-auto  p-1 d-flex place-items-center justify-content-center"
            render={renderProps => (
              <button onClick={renderProps.onClick} disabled={renderProps.disabled}></button>
            )}
          />
        </div>
        <div>
          <p className="dont-have-account">Already have an account? <Link to='/' >Sign in</Link></p>
        </div>
      </div>
    </>
  )
}
export default SignUp
