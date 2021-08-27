import React from 'react'
import './Index.css'
import Fade from 'react-reveal'
function Rewards() {
  return (
    <>
      <Fade right>
        <div className='rewards-form w-100'>
          <div className='reward-header px-3 d-flex align-items-center'>
            Rewards
          </div>
          <div className='d-flex px-3 flex-column'>
            <Fade right>
              <div className='reward-item d-flex flex-row align-items-center justify-content-between'>
                <div className='d-flex flex-column'>
                  <span className='reward-id'>ID 67263727</span>
                  <span className='time-stamp' >{'21 Dec 2021'} ,  {'4:40 pm'} </span>
                </div>
                <span className='reward-pts'>You have earned <strong>{'6'}</strong> pts</span>

              </div>
            </Fade>
            <Fade right>
              <div className='reward-item d-flex flex-row align-items-center justify-content-between'>
                <div className='d-flex flex-column'>
                  <span className='reward-id'>ID 67263727</span>
                  <span className='time-stamp' >{'21 Dec 2021'} ,  {'4:40 pm'} </span>
                </div>
                <span className='reward-pts'>You have earned <strong>{'6'}</strong> pts</span>

              </div>
            </Fade>
            <Fade right>
              <div className='reward-item d-flex flex-row align-items-center justify-content-between'>
                <div className='d-flex flex-column'>
                  <span className='reward-id'>ID 67263727</span>
                  <span className='time-stamp' >{'21 Dec 2021'} , {'4:40 pm'} </span>
                </div>
                <span className='reward-pts'>You have earned <strong>{'6'}</strong> pts</span>

              </div>
            </Fade>


          </div>
        </div>
      </Fade>
    </>
  )
}

export default Rewards
