import React, { useEffect, useState } from 'react'
import { Fade } from 'react-reveal';
import './Styles.css'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import API from '../../Services/Api'
import Loader from '../Loaders/Spinner'
export default function PublicItems(props) {
  const token = useSelector(state => state.authReducer.token)
  let headers = {
    Authorization: `Bearer ${token}`
  }

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const ApiCall = async () => {
    try {
      let result = await API.get(`/listed-item-of-seller/${props.match.params.id}`, { headers: headers })

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

    ApiCall()
  }, [ApiCall])
  if (loading) {
    return (
      <Loader />
    )
  }
  return (
    <div className='w-100'>
      <div className='seller-items-wrap'>
        <div className='seller-items-header p-2 d-flex flex-row justify-content-between'>
          <span>All Items</span>
        </div>
        <div className='seller-listed-item-wrap d-flex flex-column'>
          {data.length > 0 ? data.map((item, i) =>
            <div key={i} className='seller-items-list d-flex flex-column my-2'>
              <Fade right>
                <div className='seller-item-content px-2 w-100'>
                  <div className='d-flex flex-row w-100 justify-content-between'>
                    <div className='seller-item-img-wrap'>
                      <img src={item.i_image} alt='' />
                    </div>
                    <div className='item-info px-2 d-flex flex-column'>
                      <span className='seller-item-name'>{item.item_name}</span>
                      <span className='seller-item-category'>{item.category}</span>
                      <span className='seller-item-description'>{item.description}</span>
                    </div>
                  </div>
                </div>
              </Fade>
              <hr />
              <Fade right>
                <div className='d-flex flex-row justify-content-between px-3 align-items-center'>
                  <div className='seller-item-price'>${item.price}</div>
                  <div className='seller-items-btns  d-flex flex-row align-items-center'>
                    <Link to={`/view/${item._id}`} className='edit-item-btn' >View</Link>

                  </div>
                </div>
              </Fade>
            </div>
          )
            : 'no data to display'}
        </div>
      </div>

    </div>
  )
}

