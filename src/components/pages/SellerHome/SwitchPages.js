import React from 'react'
import { Switch, Route } from 'react-router-dom'
import SellerOrders from './SellerOrders'
import Items from './Items'
import AddItems from './AddItems'
import Blogs from '../Blogs/Blogs'
import Reviews from './Reviews'
import EditItem from './EditItem'

function SwitchPages() {
  return (
    <div>
      <Switch>

        <Route exact path='/seller/orders' component={SellerOrders} />
        <Route exact path='/seller/items' component={Items} />
        <Route exact path='/seller/items/additems' component={AddItems} />
        <Route exact path='/seller/blogs' component={Blogs} />
        <Route exact path='/seller/reviews' component={Reviews} />
        <Route exact path='/seller/items/edit' component={EditItem} />
      </Switch>
    </div>
  )
}

export default SwitchPages
