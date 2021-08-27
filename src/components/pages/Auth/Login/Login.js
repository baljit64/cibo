import { useState } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../../assets/logo.png'
import * as RiIcons from 'react-icons/ri'
import * as IoIcons from 'react-icons/io'
import * as HiIcons from 'react-icons/hi'
import * as BiIcons from 'react-icons/bi'
import Slide from 'react-reveal/Slide';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { useDispatch } from 'react-redux'
import { SET_TOKEN, VERIFY_SELLER } from '../../../store/Constants'
import API from '../../../Services/Api'

function Login() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const loginValid = () => {
    if (email === '' || password === '') {
      setErrorMsg('Please Fill All fileds')
      return false;

    }
    else {
      return true
    }
  }
  const loginSubmit = async (e) => {
    setErrorMsg('')
    e.preventDefault();
    let loginDetails = {
      email: email,
      password: password,
      type: 'manual'
    }
    if (loginValid()) {
      try {
        let result = await API.post('/login', loginDetails)
        if (result.status === 200) {
          if (result.data.seller) {
            dispatch({ type: VERIFY_SELLER, payload: result.data.seller })
          }

          dispatch({
            type: SET_TOKEN,
            payload: result.data.token
          })
        }
      }
      catch (e) {
        if (e.response) {
          setErrorMsg(e.response.data.message)
        }
      }
    }
  }

  const responseFacebook = async (response) => {
    if (response.status) {
      console.log(response.status)
    }
    else {

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
      console.log(e)
    }
  }

  return (
    <>
      <div className="login-form w-100">
        <span className="text-center"> <img className="login-logo" src={Logo} alt="logo" /></span>
        <div className="login-heading ">
          <h4 className="py-3 mb-2">Login here</h4>
        </div>
        <form>
          <div className="login-input-box mx-auto d-flex flex-column">
            <p className='text-left text-danger'>{errorMsg}</p>
            <Slide top>
              <label className="w-100">
                <span className="field-icons"><HiIcons.HiOutlineMail /></span>
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="login-fileds d-block w-100" required placeholder="Email" type="email" />
              </label>
              <label className=" w-100">
                <span className="field-icons"><BiIcons.BiLock /></span>
                <input value={password} onChange={(e) => setPassword(e.target.value)} className="login-fileds d-block w-100" required placeholder="Password" type="password" >
                </input>
              </label>
            </Slide>
            <div className="foregtpass">
              <Link to='/forget' className="">Forget your password ?.</Link>
            </div>
            <button type="submit" onClick={loginSubmit} className="login-btn">LOGIN</button>
          </div>
        </form>
        <p className="text-center  text-muted">or Login with.</p>
        <div className="Login-create-account-links py-3 d-flex flex-row justify-content-center">
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
            cssClass="googleSignbtn my-auto  p-1 d-flex place-items-center justify-content-center"
            render={renderProps => (
              <button onClick={renderProps.onClick} disabled={renderProps.disabled}></button>
            )}
          />
        </div>
        <div>
          <p className="dont-have-account">Don't have an account? <Link to='/signup' >Sign up</Link></p>
        </div>
      </div>


    </>
  )
}

export default Login

