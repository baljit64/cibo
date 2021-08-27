import React from 'react'

import './Index.css'

import LeftSection from './LeftSection'
import Routes from './Routes'

function Index() {

  return (
    <>
      <div className="container px-1">
        <div className="profile-wrap">
          <div className='profile-left d-none d-md-block'>
            <LeftSection />
          </div>
          <div className="profile-right d-md-block">
            <Routes />
          </div>
        </div>
      </div>

    </>
  )
}

export default Index;
