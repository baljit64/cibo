import React from 'react'
import Offer from './Offers'
import './Home.css'
import Trending from './Trending'
import Recent from './Recent'
import Favorite from './HomeFavorites'
import { useSelector } from 'react-redux'
import Pickup from './Pickup'

export default function Home() {
  const mode = useSelector(data => data.getLocation.mode)

  return (
    <>
      {mode ?
        <Pickup />
        :
        <>
          <Offer />
          <Trending />
          <Favorite />
          <Recent />
        </>
      }
    </>
  )
}
