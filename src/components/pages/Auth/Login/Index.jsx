import './Login.css'
import { useSpring, animated } from 'react-spring'
import React from 'react'
import Fade from 'react-reveal/Fade';
import PublicRoutes from './PublicRoutes'

export default function Login() {
  const fadein = useSpring({ to: { opacity: 1, y: 0 }, from: { opacity: 0, y: -200 }, delay: 400 })
  const flip = useSpring({ loop: true, to: { opacity: 1, delay: 1000, rotateX: 0 }, from: { opacity: 0, rotateX: 360 }, delay: 2000, duration: 2000 })
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
              <div className="login-right mx-auto">
                <PublicRoutes />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
