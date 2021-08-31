import React, { useEffect, useState } from 'react'
import API from '../../Services/Api'
import './Search.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade';
import * as GoIcons from 'react-icons/go'
import * as MdIcons from 'react-icons/md'
import { Container } from 'react-bootstrap'
import { SET_KEYWORD } from '../../store/Constants'
function Search() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.authReducer.token)
  const word = useSelector(state => state.data.keyword)
  let headers = {
    Authorization: `Bearer ${token}`
  }
  const [data, setData] = useState([])
  const [keyword, setKeyword] = useState(word)

  const ApiCall = async () => {
    try {
      let result = await API.get(`/search/${keyword}`, { headers: headers })
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
    if (keyword === '') {
      return false
    }
    ApiCall()
  }, [keyword])

  useEffect(() => {
    if (!word) {
      return false
    }
    ApiCall()
  }, [])
  const InputValue = e => {
    setKeyword(e)
    dispatch({ type: SET_KEYWORD, payload: e })
  }
  const cross = () => {
    setKeyword('')
    dispatch({ type: SET_KEYWORD, payload: '' })
    setData([])
  }
  return (
    <div className=''>
      <div className='search-wrap'>
        <div className='container-fluid bg-dark'>
          <Container className='px-0' bg="light">
            <div className='search-header py-2 mx-auto'>
              <span onClick={cross} className='crossBtn'> <MdIcons.MdClear /></span>
              <input autoFocus value={word} onChange={e => InputValue(e.target.value)} type="text" className='form-control text-capitalize' placeholder='Search here' />
            </div>
          </Container>
        </div>
        <Container>
          <div className='search-header py-3'>
            Search Result
          </div>

          <div className="fav-grid  pb-3">
            {
              data && data.map((item, index) =>
                <div key={index} className="fav-card">
                  <Link to={`/view/${item._id}`} className='detail-page-link' style={{ textDecoration: 'none' }}></Link>
                  <div className='fav-img-box'>
                    {/* <div onClick={e => Like(index, item.seller_id, item._id)} className={item.liked ? "recent-fav fav-heart like" : "recent-fav fav-heart"}><AiIcons.AiFillHeart /></div> */}
                    <img className="favImg" src={item.i_image} alt="food" />
                  </div>
                  <div className="card-content py-3 px-2">
                    <Fade up>
                      <div className="d-flex flex-column">
                        <h4 className='text-capitalize'>{item.item_name}</h4>
                        <span className="text-capitalize d-flex flex-row  align-items-center justify-content-between"><p>{item.category}</p>  <p className="d-flex align-items-center km">
                          <GoIcons.GoLocation className="mr-1" />&nbsp;{item.distance.toString().slice(0, 3)} km </p> </span>
                      </div>
                    </Fade>
                  </div>
                </div>
              )}
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Search
