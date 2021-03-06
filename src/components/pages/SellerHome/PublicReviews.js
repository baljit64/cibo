import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import API from '../../Services/Api'
import * as AiIcons from 'react-icons/ai'
import Loader from '../Loaders/Spinner'
import Fade from 'react-reveal/Fade'
import { getMethod } from '../../Services/Apicall'
function PublicReviews(props) {


  const token = useSelector(state => state.authReducer.token)
  let headers = {
    Authorization: `Bearer ${token}`
  }
  const [data, setData] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const paths = {
    GET_REVIEW: `/get-reviews/${props.match.params.id}`
  }
  const apiCall = async () => {
    const result = await getMethod(paths.GET_REVIEW, headers)
    if (result.status === 200) {
      setData(result.data.data)
      setLoading(false)
    }
    else {
      setError(result)
      setLoading(false)
    }
  }
  useEffect(() => {
    apiCall()
  }, [])
  let oneStar = (
    <><AiIcons.AiFillStar />
      <AiIcons.AiOutlineStar />
      <AiIcons.AiOutlineStar />
      <AiIcons.AiOutlineStar />
      <AiIcons.AiOutlineStar />
    </>
  )
  let twoStar = (
    <><AiIcons.AiFillStar />
      <AiIcons.AiFillStar />
      <AiIcons.AiOutlineStar />
      <AiIcons.AiOutlineStar />
      <AiIcons.AiOutlineStar />
    </>
  )
  let threeStar = (
    <>
      <AiIcons.AiFillStar />
      <AiIcons.AiFillStar />
      <AiIcons.AiFillStar />
      <AiIcons.AiOutlineStar />
      <AiIcons.AiOutlineStar />
    </>
  )
  let fourStar = (
    <>
      <AiIcons.AiFillStar />
      <AiIcons.AiFillStar />
      <AiIcons.AiFillStar />
      <AiIcons.AiFillStar />
      <AiIcons.AiOutlineStar />
    </>
  )
  let fiveStar = (
    <>
      <AiIcons.AiFillStar />
      <AiIcons.AiFillStar />
      <AiIcons.AiFillStar />
      <AiIcons.AiFillStar />
      <AiIcons.AiFillStar />
    </>
  )
  if (loading) {
    return (
      <Loader />
    )
  }
  return (
    <div className='w-100'>
      <div className='reviews-header px-2'>
        Reviews
      </div>
      <div className='d-flex flex-column px-2'>
        {
          data && data.length > 0 ?
            data.map((item, i) =>
              <div key={i} className='review-card my-1 '>
                <Fade right>
                  <div className='review-user-img'><img src={item.user_image} alt='' /> </div>
                  <div className='review-content d-flex flex-column'>
                    <span className='review-name'>{item.user_name}</span>
                    <span className='review-stars d-flex flex-row'>{
                      item.star ? <span className='review-done d-flex flex-column align-items-end'>
                        <span>{item.star === 1 ? oneStar : ''}{item.star === 2 ? twoStar : ''}{item.star === 3 ? threeStar : ''}{item.star === 4 ? fourStar : ''}{item.star === 5 ? fiveStar : ''}</span>
                      </span> : ''
                    }</span>
                    <span className='review-message'>{item.message}</span>
                  </div>
                </Fade>
              </div>
            ) : "No reviews on this profile"
        }
      </div>
    </div>
  )
}

export default PublicReviews
