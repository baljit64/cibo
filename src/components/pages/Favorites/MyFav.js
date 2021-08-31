import React, { useEffect, useState } from 'react'
import '../Home/Home.css'
import './styles.css'
import * as AiIcons from 'react-icons/ai'
import * as GoIcons from 'react-icons/go'
import Loader from '../Loaders/Spinner'
import Slide from 'react-reveal'
import API from '../../Services/Api';
import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux'
function MyFav() {
  const token = useSelector(state => state.authReducer.token)
  const location = useSelector(state => state.getLocation.Location)
  let headers = {
    Authorization: `Bearer ${token}`
  }
  const [loader, setLoader] = useState(true)
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const callApi = async () => {
    try {
      setData([])
      setLoader(true)
      let result = await API.get(`/view-favorite`, { headers: headers });
      if (result.status === 200) {
        setData(result.data.result)
        setTotal(result.data.result.length)
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
  }, [callApi])
  useEffect(() => {
    callApi();
  }, [location])
  useEffect(() => {
    if (total === 0 && !data) {
      return false;
    }
    if (total === 0) {
      callApi();
    }
  }, [total])
  // removing from likes{
  const Like = async (index, seller_id, item_id) => {
    let cls = document.getElementsByClassName('fav-card')[index];
    setTotal(total - 1)
    let data = {
      seller_id, item_id, like_status: false
    }
    cls.classList.add('d-none')
    try {
      let res = await API.post('/favorite', data, { headers: headers });
    }
    catch (e) {
      if (e.response) {
        console.log(e.response.data)
      }
    }
  }
  // end of dislike function
  if (loader) {
    return (
      <Loader />
    )
  }
  return (
    <>
      <div className='container'>
        <div className='fav-grid-header'>
          Favorites
        </div>
        <div className="">
          <div className="fav-grid pb-5 mt-0">
            {
              data.length > 0 ?
                data.map((item, index) =>
                  <Slide up>
                    <div key={index} className="fav-card">
                      <Link to={`/view/${item._id}`} className='detail-page-link' style={{ textDecoration: 'none' }}></Link>
                      <div className='fav-img-box'>
                        <div onClick={() => Like(index, item.seller_id, item._id)} className={"fav fav-heart  like"}><AiIcons.AiFillHeart /></div>
                        <img className="favImg" src={item.i_image} alt="food" />
                      </div>
                      <div className="card-content p-3">
                        <div className="d-flex flex-column">
                          <h4>{item.item_name}</h4>
                          <span className="seller-name d-flex"> <p className="by">By &nbsp; </p>{item.seller_name}</span>
                          <span className="d-flex flex-row  align-items-center justify-content-between">{item.distance > 5.0 ? "" : <p className="d-flex align-items-center km">
                            <GoIcons.GoLocation className="mr-1" />&nbsp;{item.distance.toString().slice(0, 3)} km </p>}  <p className='fav-price'>$ {item.price}</p> </span>
                        </div>
                      </div>
                    </div>
                  </Slide>
                )
                : ''
            }
          </div>
        </div>
        {data.length === 0 ?
          <div className='w-100 no-data-wrap d-flex justify-content-center align-items-center'>
            No items added to favorites.
          </div> : ''
        }
      </div>
    </>
  )
}

export default MyFav
