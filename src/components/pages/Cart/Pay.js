import './Cart.css'
import { Modal } from 'react-bootstrap'
import React, { useState } from 'react'
import * as BiIcons from 'react-icons/bi'
import { Link } from 'react-router-dom'
import Slider from "react-slick";
import visa from '../../assets/visa.png'
import paytm from '../../assets/paytm.png'
import paypal from '../../assets/paypal.svg'
import dots from '../../assets/dots.svg'
import masterlogo from '../../assets/masterlogo.svg'
import visacard from '../../assets/visacard.svg'
import mastercard from '../../assets/mastercard.svg'
import * as GoIcons from 'react-icons/go'
import { useSelector } from 'react-redux';
import API from '../../Services/Api'
export default function Pay(props) {
  const token = useSelector(state => state.authReducer.token)
  const amount = useSelector(state => state.getLocation.amount)
  const delivery_time = useSelector(state => state.getLocation.delivery_time)

  const [payment_method, setPayment_method] = useState(null);
  const [msg, setMsg] = useState('')
  const [paymentMsg, setPaymentMsg] = useState('')
  let headers = {
    Authorization: `Bearer ${token}`
  }
  const handingRef = (index, value) => {
    let c1 = document.getElementsByClassName('payment-options');
    let c2 = document.getElementsByClassName('tik-circle');
    for (let i = 0; i < c1.length; i++) {
      c1[i].classList.remove('selected-wallet')
      c2[i].classList.remove('tik')
    }
    c1[index].classList.add('selected-wallet')
    c2[index].classList.add('tik')
    setPayment_method(value)
  }
  const [show, setShow] = useState(false);
  const [paying, setPaying] = useState(false)
  let data = {
    delivery_time, payment_method
  }
  const ApiCall = async () => {
    setShow(true)
    setPaying(true)
    try {
      let result = await API.post('/add_to_order', data, { headers: headers })

      if (result.status === 200) {
        setPaymentMsg('Your Order placed Successfully, wait to seller response')
        setPaying(false)
      }
    }
    catch (e) {
      if (e.response) {
        setPaying(false)
        setPaymentMsg(e.response.data.message)

      }
    }
  }
  const payment = () => {
    setMsg('')
    if (!payment_method) {
      setMsg('Please Select a Wallet option to pay....')
      return false
    }
    else {
      ApiCall()

    }

  }
  const settings = {
    speed: 200,
    slidesToShow: 3,
    centerMode: true,
    infinite: true,
    className: "center",
    centerPadding: "60px",
    slidesToScroll: 1,
    nextArrow: false,
    prevArrow: false,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          centerMode: true,
          className: "center",
          centerPadding: "60px"

        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          centerMode: true,
          className: "center",
          centerPadding: "50px",

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
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          centerMode: true,
          className: "center",
          centerPadding: "10px",

        }
      }
    ]
  };
  return (
    <div className='container'>
      <div className='pay-wrap mx-auto'>
        <div className='pay-header'>
          <Link to='/cart'><BiIcons.BiArrowBack /> </Link>
          <span className=''>Payment Methods</span>
        </div>
        <div className='pay-body'>
          <div className='pay-cards'>
            <div className='pay-cards-header'>
              Saved Cards
            </div>
            <div className='pay-cards-list'>
              <Slider  {...settings}>

                <div className='p-2 onselect-noeffect'>
                  <img src={visacard} alt='' />
                </div>
                <div className='p-2 onselect-noeffect'>
                  <img src={mastercard} alt='' />

                </div>
                <div className='p-2 onselect-noeffect'>
                  <img src={visacard} alt='' />
                </div>
                <div className='p-2 onselect-noeffect'>
                  <img src={mastercard} alt='' />
                </div>
              </Slider>
            </div>
          </div>
          <div className='select-pay-cards'>
            <div className='my-3 select-wallet'>Select wallet to pay</div>
            <div className='my-3 select-wallet text-danger'>{msg}</div>
            <div className='row'>
              <div className='col-md-6 col-sm-12'>
                <div onClick={() => handingRef(0, "Paypal")} className='payment-options d-flex justify-content-between align-items-center'>
                  <div className='logo-card-name d-flex flex-row '>   <img className='wallet-logo my-auto' alt='' src={paypal} /> <div className='d-flex flex-column'>
                    <span className='card-type'> PayPal</span>
                    <span className='d-flex card-number align-items-center' ><img src={dots} alt='' /> &ensp; {' 4567'}</span>
                  </div></div>
                  <div className='tik-circle'><GoIcons.GoCheck /></div>
                </div>
              </div>
              <div className='col-md-6 col-sm-12'>
                <div onClick={() => handingRef(1, "Credit card")} className='payment-options d-flex justify-content-between align-items-center'>
                  <div className='logo-card-name d-flex flex-row align-items-center'>   <img alt='' className='wallet-logo visa-logo my-auto' src={visa} /> <div className='d-flex flex-column'>
                    <span className='card-type'> Credit Card</span>
                    <span className='d-flex card-number align-items-center' ><img src={dots} alt='' /> &ensp; {' 4567'}</span>
                  </div></div>
                  <div className='tik-circle'><GoIcons.GoCheck /></div>
                </div>
              </div>
              <div className='col-md-6 col-sm-12'>
                <div onClick={() => handingRef(2, "Paytm")} className='payment-options d-flex justify-content-between align-items-center'>
                  <div className='logo-card-name d-flex flex-row '>   <img className='wallet-logo my-auto' alt='' src={paytm} /> <div className='d-flex flex-column'>
                    <span className='card-type'> Paytm</span>
                    <span className='d-flex card-number align-items-center' ><img src={dots} alt='' /> &ensp; {' 4567'}</span>
                  </div></div>
                  <div className='tik-circle'><GoIcons.GoCheck /></div>
                </div>
              </div>
              <div className='col-md-6 col-sm-12'>
                <div onClick={() => handingRef(3, 'Credit card')} className='payment-options  d-flex justify-content-between align-items-center'>
                  <div className='logo-card-name d-flex flex-row '>   <img className='wallet-logo my-auto' alt='' src={masterlogo} /> <div className='d-flex flex-column'>
                    <span className='card-type'> Credit Card</span>
                    <span className='d-flex card-number align-items-center' ><img alt='' src={dots} /> &ensp; {' 4567'}</span>
                  </div></div>
                  <div className='tik-circle '><GoIcons.GoCheck /></div>
                </div>
              </div>
              <div className='col-sm-12 mb-3'>
                <div className='d-flex my-3 flex-row  align-items-center justify-content-end'>
                  <span className='pay-amount mx-3'>${amount}</span>
                  <span onClick={payment} className='pay-btn'>Pay Now</span>

                </div>
              </div>
            </div>


          </div>
        </div>
      </div>

      <Modal
        show={show}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard={false}
      >{paying ?
        <div className=" msg-wrap d-flex justify-content-center align-items-center">

          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        :
        <>
          <div className=' msg-wrap d-flex justify-content-center align-items-center'>
            <span className='payment-message'>{paymentMsg}</span>
          </div>
          <div className='m-3 d-flex justify-content-end'>
            <Link className='text-right ok-link' to='/orders'>Ok</Link>
          </div>
        </>
        }

      </Modal>
    </div>
  );
}