import React, { useState, useEffect } from 'react'
import './Blogs.css'
import Loader from '../Loaders/Spinner'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import API from '../../Services/Api'

function Blogs() {
  const token = useSelector(state => state.authReducer.token)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  let headers = {
    Authorization: `Bearer ${token}`
  }
  const ApiCall = async () => {
    try {
      setLoading(true)
      let result = await API.get('/get-blogs', { headers: headers })

      if (result.status === 200) {
        setLoading(false)
        setData(result.data.data)
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
  }, [])
  if (loading) {
    return (<Loader />)
  }
  return (
    <div id='blogs'>
      <div className='blog-wrap'>
        <div className='blog-header d-flex flex-row align-items-center'>
          <span className='w-50 blog-label-header px-2'>Blogs</span>
          <div className='w-50'>
            <Link to="/profile/blogs/addblog" style={{ textDecoration: 'none' }} className='add-blog'>Add Blog</Link>
          </div>
        </div>
        <div className='blogs-list pt-3 d-flex flex-column'>
          {data.length > 0 ?
            data.map((item, index) =>
              <div key={index} className='blog d-flex flex-row'>
                <div className='blog-img'>
                  <img className='blog-img w-100' src={item.image} />
                </div>
                <div className='blog-content px-2 d-flex w-75 flex-column'>
                  <span className='blog-name'>{item.title}</span>
                  <div className='blog-info text-muted d-flex flex-row align-items-center'><span>by : {item.user_name}</span>
                    <span className='px-1'>|</span> <span>{item.date.slice(0, 10)}</span></div>
                  <span className=' blog-details'>{item.desc} </span>
                </div>
              </div>
            )
            : <div className='noblog-msg d-flex justify-content-center align-items-center' ><span>No Blogs Added.</span></div>
          }
        </div>
      </div>
    </div>
  )
}

export default Blogs
