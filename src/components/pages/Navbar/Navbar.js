import React from 'react'
import './Navbar.css'
import * as GoIcons from 'react-icons/go'
import * as FaIcons from 'react-icons/fa'
import * as FiIcons from 'react-icons/fi'
import * as IoIcons from 'react-icons/io5'
import Logo from '../../assets/logo.png'
import Food from '../../assets/Food.jpg'
import Slide from 'react-reveal/Slide';

export default function Navbar() {
  return (
    <> <Slide top>
      <div className="container-fluid bg-light px-0">

        <div className="container">

          <div className="navbar py-0 mx-auto ">
            <div className="nav-left">
              <div className="nav-logo">
                <img className="n-logo" src={Logo} alt="logo" />
              </div>
              <div className="nav-loaction text-muted">
                <div className="nav-location-icon" >
                  <GoIcons.GoLocation />
                </div>
                <div >
                  <h6>Select Loaction</h6>
                  <h5>Liudhiana</h5>
                </div>
                <div className="loaction-expand-icon">
                  <FaIcons.FaCaretDown />
                </div>
              </div>
            </div>
            <div className="nav-right">
              <div className="nav-search d-md-block d-none text-muted">
                <IoIcons.IoSearchOutline /> &nbsp; Search
              </div>
              <div className="nav-profile d-sm-flex d-none  px-3">
                <div className="dp"><img className="dp"
                  src={Food} /></div>
                <div className="nav-name text-muted px-1">Hi&nbsp;{'Baljit'}<FaIcons.FaCaretDown /> </div>
              </div>
              <div className="nav-cart  d-md-block d-none  text-muted"><FiIcons.FiShoppingCart />&nbsp; Cart</div>


            </div>
          </div>

        </div>

      </div>
    </Slide>

    </>
  )
}
