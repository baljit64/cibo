import React, { useState, useEffect } from 'react'
import './Home.css';
import Fade from 'react-reveal/Fade';
import Slider from "react-slick";
import * as GoIcons from 'react-icons/go'
import * as AiIcons from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { SET_LOCATION } from '../../store/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleMap, Marker } from '@react-google-maps/api';
import API from '../../Services/Api';
function Pickup() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.authReducer.token)
  const location = useSelector(state => state.getLocation.Location)
  let headers = {
    Authorization: `Bearer ${token}`
  }
  const currentPosition = useSelector(state => state.getLocation.Location)

  const onMarkerchange = (e) => {
    locationChanged(e)
  };
  const locationChanged = (data) => {
    dispatch({
      type: SET_LOCATION,
      payload: data
    })
  }
  const mapStyles = {
    height: "100%",
    width: "100%",
    zIndex: '1'
  };
  useEffect(() => {
    ApiCall()
  }, [])
  let d = {
    "option": "auto"
  }
  const [data, setData] = useState([])
  const ApiCall = async () => {
    try {
      let result = await API.post('/pickup', d, { headers: headers })

      if (result.status === 200) {
        setData(result.data.data)
      }
    }
    catch (e) {
      if (e.response) {
        console.log(e.response.data)
      }
    }
  }

  useEffect(() => {
    ApiCall()
  }, [location])
  const settings = {
    nextArrow: false,
    prevArrow: false,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    className: "center",
    centerPadding: "30px",
    responsive: [

      {
        breakpoint: 767,
        settings: {
          speed: 200,
          slidesToShow: 2,
          className: "center",
          centerPadding: "20px",
          centerMode: true,
          infinite: true,
          slidesToScroll: 1,
          nextArrow: false,
          prevArrow: false
        }
      },
      {
        breakpoint: 640,
        settings: {
          speed: 200,
          slidesToShow: 1,
          className: "center",
          centerMode: true,
          infinite: true,
          centerPadding: "10px",
          slidesToScroll: 1,
          nextArrow: false,
          prevArrow: false
        }
      }
    ]
  };
  return (
    <div className='pickup-wrap'>
      <div className='container'>
        <div className='pickup-section d-flex flex-row'>
          <div className='pickup-left'>
            <GoogleMap
              mapContainerStyle={mapStyles}
              zoom={13}
              center={currentPosition}
            >
              {currentPosition.lng &&
                (
                  <Marker position={currentPosition}
                    label={"You"}
                  >
                  </Marker>
                )
              }
              {
                data && data.map((m, i) =>
                  <Marker key={i} position={{ lat: m.lat, lng: m.lng }}
                    label={m.seller_name}
                  >
                  </Marker>
                )
              }
            </GoogleMap>
          </div>
          <div className='pickup-right p-2'>
            <div className='pick-right-header'>
              Near By Sellers
            </div>
            <div className='flex-column d-none d-md-flex'>
              {data.length > 0 ?
                data.map((m, i) =>
                  <div key={i} className='seller-card-wrap'>
                    <Link to={`/publicseller/${m.seller_id}/items`}></Link>
                    <div className='seller-card-img'>
                      <img src={m.seller_image} alt="" />
                    </div>
                    <div className="card-content px-2">
                      <Fade up>
                        <div className="d-flex flex-column">
                          <h4 className="text-capitalize">{m.seller_name}</h4>
                          <span className="d-flex  flex-row  align-items-center justify-content-between"><p className='pick-up-star text-dark'> <AiIcons.AiFillStar className='text-warning' />  {m.reviews ? m.reviews : '0.0'}</p>  <p className="d-flex align-items-center km">
                            <GoIcons.GoLocation className="mr-1" />&nbsp;{m.distance.toString().slice(0, 3)} km </p> </span>
                        </div>
                      </Fade>
                    </div>
                  </div>)
                : "no result found"
              }
            </div>
            <div className='d-block d-md-none'>
              <Slider   {...settings}>
                {
                  data.length > 0 ?
                    data.map((m, index) =>
                      <div key={index} className="trending-card-wrap">
                        <Link to={`/publicseller/${m.seller_id}/items`} style={{ textDecoration: 'none' }}>
                          <Fade>
                            <div className="trending-card">
                              <img className="favImg" src={m.seller_image} alt="food" />
                              <div className="card-content p-3">
                                <div className="d-flex flex-column">
                                  <h4>{m.seller_name}</h4>
                                  <div className="trendingdistance d-flex flex-row  align-items-center justify-content-between">
                                    {<span className=" d-flex align-items-center recent-km py-1">
                                      <GoIcons.GoLocation className="mr-1" />&nbsp;{m.distance.toString().slice(0, 3)} km </span>} <span className="d-flex  align-items-center">
                                      &nbsp; </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Fade>
                        </Link>
                      </div>
                    ) : ""}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Pickup
