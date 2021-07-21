import React from 'react'
import Slider from "react-slick";
import Fade from 'react-reveal/Fade';

import offer1 from '../../assets/offer1.png'
import offer2 from '../../assets/offer2.png'
import offer3 from '../../assets/offer3.png'
import offer4 from '../../assets/offer4.png'
import './offers.css'
export default function Offers() {

  const settings = {

    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,

        }
      },
      {
        breakpoint: 1056,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,

        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,

        }
      }

    ]

  };
  return (
    <div className="container-fluid ">
      <div className="container mx-auto py-3">
        <Fade top>
          <Slider {...settings} className="mx-auto px-3">
            <div>
              <img className="offerImg" src={offer1} />
            </div>
            <div>
              <img className="offerImg" src={offer2} />
            </div>
            <div>
              <img className="offerImg" src={offer3} />
            </div>
            <div>
              <img className="offerImg" src={offer4} />
            </div>
            <div>
              <img className="offerImg" src={offer2} />
            </div>
            <div>
              <img className="offerImg" src={offer3} />
            </div>


          </Slider>
        </Fade>
      </div>
    </div>
  )
}
