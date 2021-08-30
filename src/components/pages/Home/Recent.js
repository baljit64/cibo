import React, { useEffect, useState } from 'react';
import Fade from 'react-reveal/Fade';
import * as AiIcons from 'react-icons/ai'
import * as GoIcons from 'react-icons/go'
import API from '../../Services/Api';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loaders/Spinner';
import { SET_LIKE } from '../../store/Constants';
export default function Recent() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.authReducer.token)
  const location = useSelector(state => state.getLocation.Location)
  // const liked = useSelector(state => state.data.liked)
  const [posts, setPosts] = useState([])
  let headers = {
    Authorization: `Bearer ${token}`
  }
  const newitems = async () => {
    try {

      setPosts([])
      let result = await API.get(`/new-items`, { headers: headers });
      if (result.status === 200) {
        if (result.data.data.length > 0) {
          setPosts(result.data.data)
        }
        setLoader(false)
      }
    }
    catch (e) {
      if (e.response) {
        setLoader(false)
        console.log(e.response)
      }
    }
  }
  useEffect(() => {
    setLoader(true)
    newitems()
  }, [location])
  // useEffect(() => {
  //   newitems()
  // }, [liked])

  useEffect(() => {
    newitems();
  }, [])
  const Like = async (index, seller_id, item_id) => {
    let cls = document.getElementsByClassName('recent-fav')[index];
    let like_status = !(cls.classList.contains('like'))
    let data = {
      seller_id, item_id, like_status
    }
    cls.classList.toggle('like')
    try {
      let result = await API.post('/favorite', data, { headers: headers });
      if (result.status === 200) {
        dispatch({
          type: SET_LIKE
        })
      }
    }
    catch (e) {
      if (e.response) {
        console.log(e.response.data)
      }
    }
  }
  const [loader, setLoader] = useState(true)

  if (loader) {
    return (
      <Loader />
    )
  }
  return (
    <div className="container-fluid trendingBg recently-added px-0">
      <div className="container mx-auto  arrow-btn py-3 ">
        <div className="px-1 py-2 d-flex flex-row align-items-center justify-content-between">
          <h4 className="trending-heading">Recently added</h4>
        </div>
        <div className="fav-grid  pb-3">
          {
            posts.length > 0 ?
              posts.map((item, index) =>
                <div key={index} className="fav-card">
                  <Link to={`/view/${item._id}`} className='detail-page-link' style={{ textDecoration: 'none' }}></Link>
                  <div className='fav-img-box'>
                    <div onClick={() => Like(index, item.seller_id, item._id)} className={item.liked ? "recent-fav fav-heart like" : "recent-fav fav-heart"}><AiIcons.AiFillHeart /></div>
                    <img className="favImg" src={item.i_image} alt="food" />
                  </div>
                  <div className="card-content py-3 px-2">
                    <Fade >
                      <div className="d-flex flex-column">
                        <h4>{item.item_name}</h4>
                        <span className="d-flex flex-row  align-items-center justify-content-between"><p>{item.category}</p>  <p className="d-flex align-items-center km">
                          <GoIcons.GoLocation className="mr-1" />&nbsp;{item.distance.toString().slice(0, 3)} km </p> </span>
                      </div>
                    </Fade>
                  </div>
                </div>
              ) : "no data to display"}
        </div>
      </div>
    </div>
  )
}
