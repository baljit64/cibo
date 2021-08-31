
import React, { useEffect, useState } from "react";
import Fade from 'react-reveal/Fade';
import Slider from "react-slick";
import * as AiIcons from 'react-icons/ai'
import * as GoIcons from 'react-icons/go'
import * as FaIcons from 'react-icons/fa'
import API from '../../Services/Api';
import { Link } from 'react-router-dom'
import Loader from '../Loaders/Spinner'
import { useSelector } from "react-redux";

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
export default function HomeFavorites() {
  const token = useSelector(state => state.authReducer.token)
  const location = useSelector(state => state.getLocation.Location)
  const liked = useSelector(state => state.data.liked)
  let headers = {
    Authorization: `Bearer ${token}`
  }
  const [loader, setLoader] = useState(true)
  const [data, setData] = useState([])
  const callApi = async () => {
    setData([])
    try {

      let result = await API.get(`/view-favorite`, { headers: headers });
      if (result.status === 200) {
        setData(result.data.result)
        setLoader(false)
      }
    }
    catch (e) {
      if (e.response) {
        setLoader(false)
        console.log(e.response.data)
      }
    }
  }
  useEffect(() => {
    callApi();
  }, [])

  useEffect(() => {
    setLoader(true)

    callApi();
  }, [location])
  useEffect(() => {
    callApi();
  }, [liked])

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
          className: "center",
          centerPadding: "30px",
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          className: "center",
          centerPadding: "30px",
        }
      },
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
        breakpoint: 540,
        settings: {
          speed: 200,
          slidesToShow: 1,
          className: "center",
          centerPadding: "10px",
          centerMode: true,
          infinite: true,
          slidesToScroll: 1,
          nextArrow: false,
          prevArrow: false
        }
      },
      {
        breakpoint: 360,
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

  if (loader) {
    return (
      <Loader />
    )
  }
  return (
    <div className={data.length === 0 ? 'd-none' : ''}>
      <div className="container mx-auto  arrow-btn py-3 ">
        <div className="px-1 py-3 d-flex flex-row align-items-center justify-content-between">
          <h4 className="trending-heading">Favorites</h4>
          <Link to='/favorites' style={{ textDecoration: 'none' }}><h6 className="px-3 trending-viewall" >View All</h6></Link>
        </div>

        <Slider  {...settings}>
          {
            data.length > 2 ?
              data.map((item, index) =>
                <div key={index} className="trending-card-wrap noeffect">
                  <Link to={`/view/${item._id}`} style={{ textDecoration: 'none' }}>

                    <div className="trending-card">
                      <div className="fav-heart like"><AiIcons.AiFillHeart /></div>
                      <img className="favImg" src={item.i_image} alt="food" />
                      <div className="card-content p-3">
                        <div className="d-flex flex-column">
                          <h4>{item.item_name}</h4>
                          <span className="d-flex"><p className="by">By &nbsp; </p><span className="seller-name"> {item.seller_name}</span> </span>
                          <div className="trendingdistance d-flex flex-row  align-items-center justify-content-between">
                            {item.distance > 5.0 ? ""
                              : <span className=" d-flex align-items-center recent-km py-1">
                                <GoIcons.GoLocation className="mr-1" />&nbsp;{item.distance.toString().slice(0, 3)} km </span>} <span className="d-flex  align-items-center">
                              &nbsp;<strong className='fav-price'>$ {item.price}</strong> </span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </Link>
                </div>
              ) : ""}

        </Slider>

        <div className='recent-grid-wrap pb-3'>
          {
            data.length < 3 && data.length > 0 ?
              data.map((item, index) =>
                <div key={index} className="fav-card">
                  <Link to={`/view/${item._id}`} className='detail-page-link' style={{ textDecoration: 'none' }}></Link>
                  <div className='fav-img-box'>
                    <div className=" fav-heart like"><AiIcons.AiFillHeart /></div>
                    <img className="favImg" src={item.i_image} alt="food" />
                  </div>
                  <div className="card-content py-3 px-2">
                    <Fade up>
                      <div className="d-flex flex-column">
                        <h4>{item.item_name}</h4>
                        <span className="d-flex flex-row  align-items-center justify-content-between"> {item.distance > 5.0 ? "" : <p className="d-flex align-items-center km">
                          <GoIcons.GoLocation className="mr-1" />&nbsp;{item.distance.toString().slice(0, 3)} km </p>}<p className='fav-price'>${item.price}</p> </span>
                      </div>
                    </Fade>
                  </div>
                </div>
              ) : ''}    </div>
      </div>
    </div>
  )
}
