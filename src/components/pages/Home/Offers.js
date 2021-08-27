
import Fade from 'react-reveal/Fade';
import offer1 from '../../assets/offer2.jpg'
import offer2 from '../../assets/offer3.jpeg'
import offer3 from '../../assets/offer2.jpg'
import offer4 from '../../assets/offer3.jpeg'
import offer5 from '../../assets/offer2.jpg'
import React, { Component } from 'react';
import Slider from "react-slick";

export default class Offers extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div className="container-fluid offer-top-margin px-0 ">
        <div className="container mx-auto pt-3">

          <Fade top>
            <Slider {...settings} className="mx-auto offer-slider">

              <div key={1} className='noeffect'>
                <img className="offerImg" src={offer1} alt="offer" />
              </div>
              <div key={2} className='noeffect'>
                <img className="offerImg" src={offer2} alt="offer" />
              </div>
              <div key={3} className='noeffect'>
                <img className="offerImg" src={offer3} alt="offer" />
              </div>
              <div key={4} className='noeffect'>
                <img className="offerImg" src={offer4} alt="offer" />
              </div>
              <div key={5} className='noeffect'>
                <img className="offerImg" src={offer5} alt="offer" />
              </div>


            </Slider>

          </Fade>
        </div>
      </div>
    )
  }
}
