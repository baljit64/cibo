import React, { useState, useEffect } from 'react'
import './Styles.css'
import { NavLink } from 'react-router-dom'
import PublicSellerRoutes from './PublicSellerRoute'
import { useSelector } from 'react-redux'
import * as FcIcons from 'react-icons/fc'
import * as GoIcons from 'react-icons/go'
import API from '../../Services/Api'
import Fade from 'react-reveal'
import Loader from '../Loaders/Spinner'
function SellerHome(props) {

  const token = useSelector(state => state.authReducer.token)


  let [data, setData] = useState([])
  let [loading, setLoading] = useState(true)

  let headers = {
    Authorization: `Bearer ${token}`
  }

  const ApiCAll = async () => {

    try {

      let result = await API.get(`/fetch_seller/${props.match.params.id}`, { headers: headers })
      if (result.status === 200) {
        setData(result.data.data)
        setLoading(false)

      }
    }
    catch (e) {
      if (e.response) {
        setLoading(false)
        console.log(e.response.data)
      }
    }
  }
  useEffect(() => {
    ApiCAll()
  }, [])
  if (loading) {
    return (
      <Loader />
    )
  }


  return (
    <div className='container'>
      <div className='seller-home-wrap'>

        <div className='seller-home-header'>
          <Fade up>
            <div className='seller-left-section'>
              <div className='seller-img'>
                <img src={data.image} alt='' />
              </div>
              <div className='seller-detail-box d-flex  flex-column py-2'>
                <div className='seller-name-tag d-flex flex-row align-items-center'>    <span className='seller-name'>{data.name}</span>
                  <span className='verify-tag'><FcIcons.FcApproval className='verified-tik' /> Verified</span></div>
                <span className='seller-adrress'><GoIcons.GoLocation className='seller-location-icon text-muted' />{data.delivery_address.slice(0, 20)}..</span>
                <span className='seller-page-bio'>{data.bio ? data.bio.slice(0, 40) + '...' : ''}</span>
              </div>
            </div>
          </Fade>

        </div>


        <div className='seller-body'>
          <Fade up>
            <div className='seller-body-left d-none d-md-block'>
              <NavLink to={`/publicseller/${props.match.params.id}/items`} activeClassName='active-seller-nested-link' className='seller-page-nav'>Items</NavLink>
              <NavLink to={`/publicseller/${props.match.params.id}/blogs`} activeClassName='active-seller-nested-link' className='seller-page-nav'><span>Blogs</span><span></span></NavLink>
              <NavLink to={`/publicseller/${props.match.params.id}/reviews`} activeClassName='active-seller-nested-link' className='seller-page-nav'>Rewiews</NavLink>
            </div>
            <div className='mobile-seller-nav-links my-2 d-flex flex-row d-md-none '>
              <NavLink to={`/publicseller/${props.match.params.id}/items`} activeClassName='active-seller-link'>Items</NavLink>
              <NavLink to={`/publicseller/${props.match.params.id}/blogs`} activeClassName='active-seller-link' >Blogs</NavLink>
              <NavLink to={`/publicseller/${props.match.params.id}/reviews`} activeClassName='active-seller-link'>Reveiws</NavLink>
            </div>
            <div className="seller-body-right">
              <PublicSellerRoutes />
            </div>
          </Fade>
        </div>
      </div>
    </div>
  )
}

export default SellerHome
