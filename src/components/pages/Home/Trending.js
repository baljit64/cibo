import React from 'react'
import Slider from "react-slick";
import Fade from 'react-reveal/Fade';
import './offers.css'
import * as BsIcons from 'react-icons/bs'
import * as AiIcons from 'react-icons/ai'
import * as GoIcons from 'react-icons/go'
import trending1 from '../../assets/trending1.png'
import trending2 from '../../assets/trending2.png'
import trending3 from '../../assets/trending3.png'
// import trending4 from '../../assets/trending4.png'
export default function Trending() {
  const settings = {

    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
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
        breakpoint: 1056,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,

        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,

        }
      }

    ]

  };
  return (
    <div className="container-fluid trendingBg">
      <div className="container mx-auto  py-3 ">
        <div className="px-3 py-2 d-flex flex-row align-items-center justify-content-between">
          <h4 className="px-3 trending-heading">Trending this Week</h4>
          <h6 className="px-3 trending-viewall" >View All</h6>
        </div>

        <Fade top>
          <Slider {...settings} className="px-3">

            <div className="px-2">
              <div className="trending-card">
                <img className="trendingImg w-100" src={trending1} />
                <div className="card-content p-3">
                  <div className="d-flex flex-column">
                    <h4>Famous Dave's Bar-B-Que</h4>
                    <span className="d-flex"><p>{"Vegetarian"}</p><p><BsIcons.BsDot className="dot" />{"Indian"}</p><p><BsIcons.BsDot className="dot" />{"Pure veg"}</p>  </span>
                    <div className="trending-heart like"><AiIcons.AiFillHeart /></div>
                    <div className="w-50 d-flex flex-row justify-content-between align-items-center">
                      <span className="trendingdistance d-flex align-items-center bg-light py-1 px-2">
                        <GoIcons.GoLocation className="mr-1" />&nbsp;{"2"}km </span>
                      <span className=" d-flex align-items-center"><AiIcons.AiFillStar className="star" /> &nbsp;<strong>{"3.1"}</strong>&nbsp;({"300 "} reviews) </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-2">
              <div className="trending-card">
                <img className="trendingImg w-100" src={trending1} />
                <div className="card-content p-3">
                  <div className="d-flex flex-column">
                    <h4>Thai Famous Cuisine</h4>
                    <span className="d-flex"><p>{"Vegetarian"}</p><p><BsIcons.BsDot className="dot" />{"Indian"}</p><p><BsIcons.BsDot className="dot" />{"Pure veg"}</p>  </span>
                    <div className="trending-heart dislike"><AiIcons.AiFillHeart /></div>
                    <div className="w-50 d-flex flex-row justify-content-between align-items-center">
                      <span className="trendingdistance d-flex align-items-center bg-light py-1 px-2">
                        <GoIcons.GoLocation className="mr-1" />&nbsp;{"2"}km </span>
                      <span className=" d-flex align-items-center"><AiIcons.AiFillStar className="star" /> &nbsp;<strong>{"3.1"}</strong>&nbsp;({"300 "} reviews) </span>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div className="px-2">
              <div className="trending-card">
                <img className="trendingImg w-100" src={trending2} />
                <div className="card-content p-3">
                  <div className="d-flex flex-column">
                    <h4>The osahan Restaurant</h4>
                    <span className="d-flex"><p>{"Vegetarian"}</p><p><BsIcons.BsDot className="dot" />{"Indian"}</p><p><BsIcons.BsDot className="dot" />{"Pure veg"}</p>  </span>
                    <div className="trending-heart like"><AiIcons.AiFillHeart /></div>
                    <div className="w-50 d-flex flex-row justify-content-between align-items-center">
                      <span className="trendingdistance d-flex align-items-center bg-light py-1 px-2">
                        <GoIcons.GoLocation className="mr-1" />&nbsp;{"2"}km </span>
                      <span className=" d-flex align-items-center"><AiIcons.AiFillStar className="star" /> &nbsp;<strong>{"3.1"}</strong>&nbsp;({"300 "} reviews) </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-2">
              <div className="trending-card">
                <img className="trendingImg w-100" src={trending3} />
                <div className="card-content p-3">
                  <div className="d-flex flex-column">
                    <h4>Famous Dave's Bar-B-Que</h4>
                    <span className="d-flex"><p>{"Vegetarian"}</p><p><BsIcons.BsDot className="dot" />{"Indian"}</p><p><BsIcons.BsDot className="dot" />{"Pure veg"}</p>  </span>
                    <div className="w-50 d-flex flex-row justify-content-between align-items-center">
                      <span className="trendingdistance d-flex align-items-center bg-light py-1 px-2">
                        <GoIcons.GoLocation className="mr-1" />&nbsp;{"2"}km </span>
                      <span className=" d-flex align-items-center"><AiIcons.AiFillStar className="star" /> &nbsp;<strong>{"3.1"}</strong>&nbsp;({"300 "} reviews) </span>
                    </div>
                    <div className="trending-heart dislike"><AiIcons.AiFillHeart /></div></div>
                </div>
              </div>
            </div>

          </Slider>
        </Fade>
      </div>
    </div >
  )
}
