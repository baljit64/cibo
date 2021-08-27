import React from 'react'
import * as BiIcons from 'react-icons/bi'
import * as BsIcons from 'react-icons/bs'
import * as FiIcons from 'react-icons/fi'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io5'
import { Link, NavLink } from 'react-router-dom'
import { LOGOUT } from '../../store/Constants'
import { useDispatch, useSelector } from 'react-redux'
import Fade from 'react-reveal'
import './Index.css'
function LeftSection() {

  const dispatch = useDispatch()
  const user = useSelector(state => state.authReducer.user)
  const seller = useSelector(state => state.getLocation.seller)


  const logout = async (e) => {
    e.preventDefault();
    dispatch({ type: LOGOUT })

  }
  return (
    <>
      <div className="mt-1 profile-left-wrap">
        <Fade left>
          <Fade left>
            <div className="left-header">
              <div className="userImg-wrap ">
                <img src={user.image} alt="user" />
              </div>
              <div className="username-wrap d-flex   flex-column">
                <span>{user.name}</span>
                <p className="text-muted">{user.email}</p>
              </div>
              <div onClick={logout} className='d-md-none px-4 profile-logout d-flex jusify-content-center align-items-center '><FiIcons.FiLogOut /></div>
            </div>
          </Fade>
          <li className="account-Options  text-muted bg-light">
            <span>Wallet amount</span><span className="amount">$ {'00.00'}</span>
          </li>
          {seller ? <NavLink to='/seller/orders' className="d-md-none d-flex account-Options" activeClassName='active-left-section' ><span><AiIcons.AiOutlineHome className='profile-list-icons' /> Seller Home </span><BiIcons.BiChevronRight className='list-arrow' /></NavLink> : ''}
          <NavLink to='/profile/blogs' className="account-Options" activeClassName='active-left-section' ><span><BsIcons.BsGrid className='profile-list-icons' /> Blogs </span><BiIcons.BiChevronRight className='list-arrow' /></NavLink>
          <NavLink to='/profile/wallet' className="account-Options" activeClassName='active-left-section' ><span><IoIcons.IoWalletOutline className='profile-list-icons' /> Payment Setting </span><BiIcons.BiChevronRight className='list-arrow' /></NavLink>
          <Link className='d-md-none d-block' to='/favorites'><li className='account-Options'><span><AiIcons.AiOutlineHeart className='profile-list-icons' /> Favorites </span><BiIcons.BiChevronRight className='list-arrow' /></li></Link>
          <NavLink to='/profile/rewards' className="account-Options" activeClassName='active-left-section' > <span><BiIcons.BiTrophy className='profile-list-icons' /> Rewards </span><BiIcons.BiChevronRight className='list-arrow' /></NavLink>
          <NavLink to='/help' className="account-Options" activeClassName='active-left-section'><span><BiIcons.BiTrophy className='profile-list-icons' /> Help </span><BiIcons.BiChevronRight className='list-arrow' /></NavLink>
          <NavLink to='/profile/setting' className="account-Options" activeClassName='active-left-section' ><span><FiIcons.FiSettings className='profile-list-icons' /> Account Setting </span><BiIcons.BiChevronRight className='list-arrow' /></NavLink>
        </Fade>
      </div>
      {seller ? "" : <div className='text-center py-4'>
        <Fade left>
          <Link to='/profile/sellerform' style={{ textDecoration: 'none' }}>
            <button className='become-seller-btn w-75'>Become Seller</button>
          </Link>
        </Fade>
      </div>}
    </>
  )
}

export default LeftSection
