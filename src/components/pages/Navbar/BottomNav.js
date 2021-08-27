import React from 'react'
import './Navbar.css'
import * as AiIcons from 'react-icons/ai'
import { NavLink, Link } from 'react-router-dom'
import * as RiIcons from 'react-icons/ri'
import * as BiIcons from 'react-icons/bi'
import * as FiIcons from 'react-icons/fi'

function BottomNav() {
  return (

    <div className="bottomNav-wrap   d-md-none  d-fixed w-100">
      <div className="bottomNav  d-flex flex-row  ">

        <NavLink to='/home' activeClassName='bottom-active' className="bottom-label  d-flex flex-column"><AiIcons.AiOutlineHome className="bottomIcon" />
        </NavLink>
        <NavLink to='/search' className="bottom-label d-flex flex-column" activeClassName='bottom-active'><BiIcons.BiSearchAlt2 className="bottomIcon" />
        </NavLink>
        <NavLink to='/cart' activeClassName='bottom-active' className="bottom-label nav-cart-icon d-flex flex-column"><FiIcons.FiShoppingCart className="bottomIcon " />
        </NavLink>
        <NavLink to='/orders' activeClassName='bottom-active' className="bottom-label d-flex flex-column"><RiIcons.RiFileListLine className="bottomIcon" />
        </NavLink>
        <NavLink to="/profile" activeClassName='bottom-active' className="bottom-label d-flex flex-column"><FiIcons.FiUser className="bottomIcon" /></NavLink>


      </div>

    </div>
  )
}

export default BottomNav
