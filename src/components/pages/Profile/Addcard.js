import React from 'react'
import './Index.css'
import Fade from 'react-reveal/Fade';
import Slider from "react-slick";
import cardBg from '../../assets/CARD.png'
import visa from '../../assets/visa.png'
import paytm from '../../assets/paytm.png'
import AddCardModal from './Popup/AddCardModel'
import { useState } from 'react'
export default function Addcard() {
  const [modalShow, setModalShow] = useState(false);

  const settings = {
    speed: 200,
    slidesToShow: 1,
    centerMode: true,
    infinite: true,
    className: "center",
    centerPadding: "220px",
    slidesToScroll: 1,
    nextArrow: false,
    prevArrow: false,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          centerMode: true,
          className: "center",
          centerPadding: "140px"

        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          centerMode: true,
          className: "center",
          centerPadding: "60px",

        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          centerMode: true,
          className: "center",
          centerPadding: "20px",

        }
      }
    ]
  };
  return (
    <div className='card-form'>
      <Fade right>
        <div className='addCard-header px-3  d-flex justify-content-between align-items-center flex-row'>
          <span>Saved Card</span>
          <span onClick={() => setModalShow(true)} className='link-card'>+ Add new Card</span>
        </div>
        <AddCardModal
          show={modalShow}
          onHide={() => setModalShow(false)} />
        <Slider  {...settings}>

          <div className='p-2'>
            <div className='payment-cards'>
              <img src={visa} className='card-tag' alt='' />
              <img src={cardBg} alt='' />
              <div className='card-holder-name d-flex flex-column'>
                <span >CARD HOLDER</span>
                <span>{'Baljit singh'}</span>
              </div>

              <div className='valid-till d-flex flex-column'>
                <span >VALID TILL </span>
                <span>{'23/10'} </span>
              </div>
              <span className='card-last-digits'>{'9898'}</span>
            </div>
          </div>

          <div className='p-2'>
            <div className='payment-cards'>
              <img src={visa} className='card-tag' alt='' />
              <img src={cardBg} alt='' />
              <div className='card-holder-name d-flex flex-column'>
                <span >CARD HOLDER</span>
                <span>{'Baljit singh'}</span>
              </div>

              <div className='valid-till d-flex flex-column'>
                <span >VALID TILL </span>
                <span>{'23/10'} </span>
              </div>
              <span className='card-last-digits'>{'9898'}</span>
            </div>
          </div>
        </Slider>
        <div className='addCard-header px-3  d-flex justify-content-between align-items-center flex-row'>
          <span>Saved Wallets</span>
          <span className='link-card'>+ Link wallet</span>
        </div>
        <div className='px-3 py-2 d-flex flex-column'>
          <div className='saved-wallets px-2  d-flex justify-content-between align-items-center flex-row'>
            <img src={paytm} className='paytm' alt='wallet-type' />
            <span className='wallet-amount'>${'399'}</span> </div>
        </div>
      </Fade>
    </div>
  )

}
