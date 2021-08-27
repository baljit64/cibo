import React, { useEffect, useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import LeftSection from './LeftSection'

import Rewards from './Rewards'
import Wallet from './Addcard'
import DesktopProfile from './DesktopProfile'
import SellerForm from '../Seller/SellerForm'
import Bank from '../Seller/BankDetails'
import Blogs from '../Blogs/Blogs'
import AddBlog from '../Blogs/AddBlog'
import SellerHome from '../SellerHome/SellerHome'
function Routes() {


  const [isDesktop, setIsDesktop] = useState(false);

  const onWidthChange = () => {
    if (window.innerWidth < 768) {
      setIsDesktop(false);
    } else setIsDesktop(true);
  }

  useEffect(() => {
    window.addEventListener('resize', onWidthChange);
    return () => window.removeEventListener('resize', onWidthChange);
  }, [])

  return (
    <Switch>
      <Route path="/profile/rewards" component={Rewards} />
      <Route path="/profile/sellerhome" component={SellerHome} />
      <Route exact path="/profile/wallet" component={Wallet} />
      <Route exact path="/profile" component={window.innerWidth > 768 ? DesktopProfile : LeftSection} />
      <Route exact path="/profile/setting" component={DesktopProfile} />
      <Route exact path="/profile/sellerform" component={SellerForm} />
      <Route exact path="/profile/bank" component={Bank} />
      <Route exact path="/profile/blogs" component={Blogs} />
      <Route exact path="/profile/blogs/addblog" component={AddBlog} />
      <Redirect to='/profile' />
    </Switch>
  )
}
// isDesktop ? DesktopProfile : LeftSection
export default Routes

