import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import Fade from 'react-reveal/Fade';
import * as AiIcons from 'react-icons/ai'
import * as GoIcons from 'react-icons/go'
import * as FaIcons from 'react-icons/fa'
import API from '../../Services/Api';
import { useSelector } from 'react-redux';
import Loader from '../Loaders/Spinner'
import { Link } from 'react-router-dom';

function SampleNextArrow(props) {
  const { style, onClick } = props;
  return (
    <div
      className={"right-arrow arrow"}
      style={{ ...style, display: "flex" }}
      onClick={onClick}
    ><FaIcons.FaChevronRight className="arrowIcon" /></div>
  );
}

function SamplePrevArrow(props) {
  const { style, onClick } = props;
  return (
    <div
      className={"left-arrow arrow"}
      style={{ ...style, display: "flex" }}
      onClick={onClick}
    >  <FaIcons.FaChevronLeft className="arrowIcon" /></div>
  );
}



export default function Trending() {
  const token = useSelector(state => state.authReducer.token)
  const liked = useSelector(state => state.data.liked)
  const mode = useSelector(state => state.getLocation.mode)
  const location = useSelector(state => state.getLocation.Location)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  let headers = {
    Authorization: `Bearer ${token}`
  }
  const APICALL = async () => {
    try {
      let result = await API.get(`/trending/${!mode ? "delivery" : "pickup_only"}`, { headers: headers })
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
    setLoading(true)
    APICALL()
  }, [location])
  useEffect(() => {
    APICALL()
  }, [liked])
  useEffect(() => {
    APICALL()
  }, [])
  const settings = {
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    infinite: true,
    speed: 200,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 767,
        settings: {
          speed: 200,
          slidesToShow: 1,
          className: "center",
          centerMode: true,
          infinite: true,
          centerPadding: "20px",
          slidesToScroll: 1,
          nextArrow: false,
          prevArrow: false
        }
      },
      {
        breakpoint: 340,
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

  if (loading) {
    return (
      <Loader />
    )
  }
  return (
    <div className="container-fluid trendingBg px-0">
      <div className="container mx-auto  arrow-btn py-3 ">
        <div className="px-1 py-2 d-flex flex-row align-items-center justify-content-between">
          <h4 className="trending-heading">Trending this Week</h4>
        </div>
        <Fade top >
          <div className={data.length === 0 ? '' : 'd-none'}>No data to display</div>
          <Slider  {...settings}>
            {data.length > 2 ?
              data.map((item, i) =>
                <div key={i} className="trending-card-wrap noeffect">
                  <div className="trending-card">
                    <Link to={`/view/${item._id}`} className='detail-page-link' style={{ textDecoration: 'none' }}></Link>
                    <div className={item.liked ? "trending-fav fav-heart like" : "trending-fav fav-heart"} ><AiIcons.AiFillHeart /></div>
                    <img className="trendingImg w-100" src={item.i_image} alt="food" />
                    <div className="card-content p-3">
                      <div className="d-flex flex-column">
                        <h4>{item.item_name}</h4>
                        <span className="d-flex"><p>{item.category}</p> </span>
                        <div className="trendingdistance d-flex flex-row  align-items-center">
                          <span className=" d-flex align-items-center km">
                            <GoIcons.GoLocation className="mr-1" />&nbsp;{item.distance} km </span>
                          {/* <span className="d-flex  align-items-center"><AiIcons.AiFillStar className="star" />
                            &nbsp;<strong>{"3.1"}</strong>&nbsp;({"300"}+<span className='review-hide'>&nbsp;reveiws</span>) </span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
              :
              ""
            }
          </Slider>
          <div className='recent-grid-wrap pb-3'>
            {
              data.length < 3 && data.length > 0 ?
                data.map((item, index) =>

                  <div key={index} className="fav-card border-0">
                    <Link to={`/view/${item._id}`} className='detail-page-link' style={{ textDecoration: 'none' }}></Link>
                    <div className='fav-img-box'>
                      <div className={item.liked ? " fav-heart like" : " fav-heart"}><AiIcons.AiFillHeart /></div>
                      <img className="favImg" src={item.i_image} alt="food" />
                    </div>
                    <div className="card-content py-3 px-2">
                      <Fade up>
                        <div className="d-flex flex-column">
                          <h4>{item.item_name}</h4>
                          <span className="d-flex flex-row  align-items-center justify-content-between"><p>{item.category}</p>  <p className="d-flex align-items-center km">
                            <GoIcons.GoLocation className="mr-1" />&nbsp;{item.distance.toString().slice(0, 3)} km </p> </span>
                        </div>
                      </Fade>
                    </div>
                  </div>
                ) : ''}    </div>
        </Fade>
      </div>
    </div>
  )
}
