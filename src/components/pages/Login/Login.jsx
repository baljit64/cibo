import { useState } from 'react'
import './Login.css'
import { useSpring, animated } from 'react-spring'
import React from 'react'
import Logo from '../../assets/logo.png'
import * as RiIcons from 'react-icons/ri'
import * as IoIcons from 'react-icons/io'
import * as HiIcons from 'react-icons/hi'
import * as BiIcons from 'react-icons/bi'
import * as MdIcons from 'react-icons/md'
import * as BsIcons from 'react-icons/bs'
import Fade from 'react-reveal/Fade';
import Slide from 'react-reveal/Slide';
export default function Login() {
  const fadein = useSpring({ to: { opacity: 1, y: 0 }, from: { opacity: 0, y: -200 }, delay: 400 })
  const flip = useSpring({ loop: true, to: { opacity: 1, delay: 1000, rotateX: 0 }, from: { opacity: 0, rotateX: 360 }, delay: 2000, duration: 2000 })
  const [login, setLogin] = useState(true);
  const [signup, setSignup] = useState(false);
  const [otp, setOtp] = useState(false);
  const [forget, setForget] = useState(false);

  const otpPage = (e) => {
    e.preventDefault();
    setOtp(true);
    setSignup(false);
    setForget(false)
    setLogin(false)
  }
  const signUp = (e) => {
    e.preventDefault();
    setOtp(false);
    setSignup(true);
    setForget(false)
    setLogin(false)
  }
  const signIn = (e) => {
    e.preventDefault();
    setOtp(false);
    setSignup(false);
    setForget(false)
    setLogin(true)

  }
  const forGet = (e) => {
    e.preventDefault();
    setOtp(false);
    setSignup(false);
    setLogin(false)
    setForget(true)
  }
  return (
    <div className="wrapper">
      <div className="container-fluid">
        <div className="row" >
          <div className="login-inner-Wrap px-0">
            <div className="login-wrap">
              <Fade left>
                <div className="login-left d-md-block d-none">
                  <animated.div className="login-page-content" style={fadein}>
                    <span className="img-content d-flex pb-3">
                      WELCOME TO <span ><animated.div style={flip}>CIBO
                      </animated.div></span>
                    </span>

                    <p >
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua.
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.""
                    </p>
                  </animated.div>
                </div>
              </Fade>
              <div className="login-right">
                <div className={login ? "" : "d-none  mx-auto"}>
                  <div className="login-form ">
                    <span className="text-center"> <img className="login-logo" src={Logo} /></span>
                    <div className="login-heading ">

                      <h4 className="py-3 mb-2">Login here</h4>
                    </div>
                    <form>
                      <div className="login-input-box mx-auto d-flex flex-column">
                        <Slide top>
                          <label className="w-100">
                            <span className="field-icons"><HiIcons.HiOutlineMail /></span>
                            <input className="login-fileds d-block w-100" placeholder="Email" type="email" />
                          </label>
                          <label className=" w-100">
                            <span className="field-icons"><BiIcons.BiLock /></span>
                            <input className="login-fileds d-block w-100" placeholder="Password" type="password" >
                            </input>
                          </label>
                        </Slide>
                        <div className="foregtpass text-right">
                          <p onClick={(e) => forGet(e)} className="text-right">Forget your password ?.</p>
                        </div>
                        <span className="login-btn">LOGIN</span>
                      </div>
                    </form>
                    <p className="text-center  text-muted">or Login with.</p>
                    <div className="Login-create-account-links py-3 d-flex flex-row justify-content-center">
                      <span > <RiIcons.RiFacebookFill /></span>
                      <span ><IoIcons.IoLogoGoogleplus /></span>
                    </div>
                    <div>
                      <p className="dont-have-account">Don't have an account? <span onClick={(e) => signUp(e)}>Sign up</span></p>
                    </div>
                  </div>
                </div>
                {/* sign up form */}
                <div className={signup ? "" : "d-none  mx-auto"}>
                  <div className="login-form">
                    <span className="text-center pt-3"> <img className="login-logo" src={Logo} /></span>
                    <div className="login-heading">
                      <h4>Sign up here.</h4>
                    </div>
                    <form>
                      <div className="login-input-box  pt-4 mx-auto d-flex flex-column">
                        <Slide bottom>
                          <label className="w-100">
                            <span className="field-icons"><BsIcons.BsFillPersonFill /></span>
                            <input className="login-fileds d-block w-100" placeholder="Name" type="text" />
                          </label>
                          <label className="w-100">
                            <span className="field-icons"><HiIcons.HiOutlineMail /></span>
                            <input className="login-fileds d-block w-100" placeholder="Email" type="email" />
                          </label>
                          <label className=" w-100">
                            <span className="field-icons"><MdIcons.MdCall /></span>
                            <input className="login-fileds d-block w-100" placeholder="Phone Number" type="number" >
                            </input>
                          </label>
                          <label className=" w-100">
                            <span className="field-icons"><BiIcons.BiLock /></span>
                            <input className="login-fileds d-block w-100" placeholder="Password" type="password" >
                            </input>
                          </label>
                          <label className=" w-100">
                            <span className="field-icons"><BiIcons.BiLock /></span>
                            <input className="login-fileds d-block w-100" placeholder="Confirm Password" type="password" >
                            </input>
                          </label>
                        </Slide>
                        <span onClick={(e) => otpPage(e)} className="mt-4 signup-next-btn">NEXT<span><BiIcons.BiChevronRight /></span> </span>
                      </div>
                    </form>
                    <p className="text-center py-2 text-muted">or Sign up with.</p>
                    <div className="Login-create-account-links mb-2  d-flex flex-row justify-content-center">
                      <span > <RiIcons.RiFacebookFill /></span>
                      <span ><IoIcons.IoLogoGoogleplus /></span>
                    </div>
                    <div>
                      <p className="dont-have-account">Already have an account? <span onClick={(e) => signIn(e)}>Sign in</span></p>
                    </div>
                  </div>
                </div>
                {/* Sign up form end */}
                {/* otp page */}
                <div className={otp ? "" : "d-none  mx-auto"}>
                  <div className="login-form-back-btn pb-3"><span className="otp-back-btn" onClick={(e) => signUp(e)}><BiIcons.BiArrowBack /></span></div>
                  <div className="login-form otp-form">

                    <Slide bottom>
                      <div className="login-heading text-center">
                        <span className="d-inline-block"> <img className="px-0 mb-3 login-logo" src={Logo} /></span>
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
                </div>
                {/* otp page end here */}
                {/* forget password */}
                <div className={forget ? "" : "d-none  mx-auto"}>
                  <div className="login-form">

                    <div className="login-heading text-left">
                      {/* <span className="d-inline-block "> <img className="p-0 mb-3 login-logo" src={Logo} /></span> */}
                      <h4>Forget   Password  </h4>
                      <p className="text-muted forget-p-heading py-3 mx-auto w-50 ">Please enter your registered email address. You will receive a link
                        to create a new password via email.</p>
                    </div>
                    <form>
                      <div className="login-input-box mx-auto d-flex flex-column">
                        <Slide top>
                          <label className=" w-100 mb-3">
                            <span className="field-icons"><BiIcons.BiLock /></span>
                            <input className="login-fileds d-block w-100" placeholder="Email Address" type="email" >
                            </input>
                          </label>
                        </Slide>
                        <span className="login-btn">SUBMIT</span>
                      </div>
                    </form>
                    <div>
                      <p className="dont-have-account pt-3">Already have an Account ? <span onClick={(e) => signIn(e)}>Log in</span></p>
                    </div>

                  </div>
                </div>
                {/* forget page end here */}
              </div>
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}
