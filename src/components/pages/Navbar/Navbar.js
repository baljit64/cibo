import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as GoIcons from 'react-icons/go'
import * as MdIcons from 'react-icons/md'
import * as AiIcons from 'react-icons/ai'
import * as FaIcons from 'react-icons/fa'
import * as FiIcons from 'react-icons/fi'
import * as HiIcons from 'react-icons/hi'
import * as IoIcons from 'react-icons/io5'
import Logo from '../../assets/logo.png'
import WhiteLogo from '../../assets/white-logo.png'
import Slide from 'react-reveal/Slide';
import { useEffect, useState } from 'react'
import BottomNav from './BottomNav'
import { SET_MODE } from '../../store/Constants'
import NavLocation from './NavLocationSearch'

export default function Navbar() {

  const dispatch = useDispatch()
  const mode = useSelector(data => data.getLocation.mode)
  let user = useSelector(data => data.authReducer.user)
  const Address = useSelector(data => data.getLocation.address)
  const seller = useSelector(state => state.getLocation.seller)
  const [show, setShow] = useState(true);
  const controlNavbar = () => {
    if (window.scrollY > 100) {
      setShow(false)
    }
    else {
      setShow(true)
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', controlNavbar)
    return () => {
      window.removeEventListener('scroll', controlNavbar)
    }
  }, [])
  const Logout = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGOUT' })

  }
  const handleMode = (e) => {
    dispatch({
      type: SET_MODE,
      payload: !mode

    })

  }
  const [mobileLocationSearch, setMobileLocationSearch] = useState(false)
  const openLocationSearch = () => {
    setMobileLocationSearch(!mobileLocationSearch)
  }

  return (
    <>
      <Slide top >
        <div className={show ? "nav d-md-block d-none container-fluid  px-0" : "nav  d-md-block d-none container-fluid dark px-0"}>
          <div className="container">
            <div className="navbar py-0 mx-auto ">
              <div className="nav-left">
                <div className="nav-logo">
                  <Link to="/home">
                    <img className="n-logo" src={show ? Logo : WhiteLogo} alt="logo" /></Link>
                </div>
                <div className={show ? "nav-loaction select-location text-muted" : "nav-loaction select-location text-light"}>
                  <div className="nav-location-icon" >
                    <GoIcons.GoLocation className={show ? "text-muted " : "text-light"} />
                  </div>
                  <div >
                    <span>Select Loaction</span>
                    <span>{Address}</span>
                  </div>
                  <div className="location-down-options p-2 text-muted flex-column">
                    <NavLocation
                      onHide={() => setMobileLocationSearch(false)} />
                  </div>
                </div>
                <div className="switch-button">
                  <input className="switch-button-checkbox" checked={mode}
                    onChange={(e) => handleMode(e.target.value)} type="checkbox"></input>
                  <label className="switch-button-label" htmlFor=""><span className="switch-button-label-span">Delivery</span></label>
                </div>
              </div>
              <div className="nav-right">
                <Link style={{ textDecoration: 'none' }} to="/search" className={show ? "nav-search d-md-flex d-none text-muted" : "nav-search d-md-flex d-none text-light"}>
                  <IoIcons.IoSearchOutline /><span className='d-none d-lg-block'>&nbsp; Search</span>
                </Link>
                <div className="nav-profile px-3 d-md-flex d-none ">
                  <div className="dp"><img className="dp"
                    src={user.image} alt="" /></div>
                  <div className={show ? "nav-name text-muted px-1" : "nav-name text-light px-1"}>
                    &nbsp;{user.name.slice(0, 6)}
                    <FaIcons.FaCaretDown /> </div>
                  <div className="profile-down-options  flex-column" >
                    <Link to="/profile/setting">  <li><FiIcons.FiUser className="profile-list-icons" />Profile </li></Link>
                    <Link to="/favorites"><li><AiIcons.AiOutlineHeart className="profile-list-icons" />Favorite</li></Link>
                    {seller ? <Link to='/seller/orders'><li><AiIcons.AiOutlineHome className="profile-list-icons" />Seller Home</li></Link> : ''}
                    <Link to="/profile/wallet"> <li><IoIcons.IoWalletOutline className="profile-list-icons" />Wallet</li></Link>
                    <Link to="/orders"><li><HiIcons.HiOutlineShoppingBag className="profile-list-icons" />My Orders</li></Link>
                    <Link to="/profile/rewards"><li><AiIcons.AiOutlineTrophy className="profile-list-icons" />Rewards</li></Link>
                    <li onClick={Logout}><FiIcons.FiLogOut className="profile-list-icons" />Logout</li>
                  </div>
                </div>
                <Link style={{ textDecoration: 'none' }} to='/cart' className={show ? "nav-cart  d-md-block d-none  text-muted" : "nav-cart  d-md-block d-none  text-light"}><FiIcons.FiShoppingCart />&nbsp; Cart</Link>
              </div>
            </div>
          </div>
        </div>
        {/* second nav */}
        <div className={"nav container-fluid d-md-none d-block px-0"}>
          <div className="container">
            <div className="navbar py-0 mx-auto ">
              <div className="nav-left">
                <div className="nav-logo">
                  <Link to="/home">
                    <img className="n-logo" src={Logo} alt="logo" /></Link>
                </div>
                <div className={"nav-loaction select-location d-none d-sm-flex text-muted"}>
                  <div className="nav-location-icon" >
                    <GoIcons.GoLocation className={"text-muted"} />
                  </div>
                  <div>
                    <span>Select Loaction</span>
                    <span>{Address}</span>
                  </div>
                  <div className="location-down-options p-2 text-muted flex-column">
                    <NavLocation
                      onHide={() => setMobileLocationSearch(false)}
                    />
                  </div>
                </div>
                <div className="switch-button">
                  <input className="switch-button-checkbox" checked={mode} onChange={(e) => handleMode(e.target.checked)} type="checkbox"></input>
                  <label className="switch-button-label" htmlFor=""><span className="switch-button-label-span">Delivery</span></label>
                </div>
                <div onClick={openLocationSearch} className='mobile-location-search-icon  d-flex d-sm-none'>{mobileLocationSearch ? <MdIcons.MdClear /> : <GoIcons.GoLocation />}

                </div>
                <div className={mobileLocationSearch ? "mobile-location-nav-input-wrap p-2 d-sm-none d-block" : "d-none"}>
                  <NavLocation
                    onHide={() => setMobileLocationSearch(false)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slide>
      <BottomNav />
    </>
  )
}
