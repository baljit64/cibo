import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PublicItems from './PublicItems'
import PublicBlogs from '../Blogs/PublicBlogs'
import PublicReviews from './PublicReviews'

function PublicSellerRoutes() {
  return (
    <Switch>
      <Route exact path='/publicseller/:id/items' component={PublicItems} />
      <Route exact path='/publicseller/:id/blogs' component={PublicBlogs} />
      <Route exact path='/publicseller/:id/reviews' component={PublicReviews} />
      <Route />
    </Switch>
  )
}

export default PublicSellerRoutes
