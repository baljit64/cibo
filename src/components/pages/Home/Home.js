import React from 'react'
import Navbar from '../Navbar/Navbar'
import Foter from './Footer'
import Offer from './Offers'
import Trending from './Trending'
export default function Home() {
  return (
    <div>
      <Navbar />
      <Offer />
      <Trending />
      <Foter />
    </div>
  )
}
