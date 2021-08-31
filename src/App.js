import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Index from './components/pages/Auth/Login/Index';
import Location from './components/pages/Location/Location';
import Profile from './components/pages/Profile/Index'
import Home from './components/pages/Home/Home';
import Favorite from './components/pages/Favorites/MyFav';
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from './components/pages/Navbar/Navbar';
import Foter from './components/pages/Footer/Footer';
import DetailPage from './components/pages/DetailPage.js/DetailPage';
import { shallowEqual, useSelector } from 'react-redux'
import Cart from './components/pages/Cart/Cart';
import ViewOrder from './components/pages/Cart/ViewOrder';
import Orders from './components/pages/Profile/Orders';
import SellerHome from './components/pages/SellerHome/SellerHome';
import PublicSeller from './components/pages/SellerHome/PublicSeller';
import Pay from './components/pages/Cart/Pay';
import Search from './components/pages/Search/Search';
import ViewSellerOrders from './components/pages/Cart/ViewSellerOrders';


function App() {


  const token = useSelector(state => state.authReducer.token, shallowEqual)
  const location = useSelector(state => state.getLocation.Location)

  if (token) {
    if (location) {
      return (
        <>
          <Navbar />
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/pay" component={Pay} />
            <Route exact path="/orders" component={Orders} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/order/:id" component={ViewOrder} />
            <Route exact path='/seller/orders/view' component={ViewSellerOrders} />
            <Route path="/seller" component={SellerHome} />
            <Route path="/publicseller/:id" component={PublicSeller} />
            <Route path="/profile" component={Profile} />
            <Route exact path="/favorites" component={Favorite} />
            <Route exact path="/view/:id" component={DetailPage} />
            <Redirect to='/home' />
          </Switch>
          <Foter />
        </>
      )
    }
    else {
      return (
        <Switch>
          <Route path="/location" component={Location} />
          <Redirect to='/location' />
        </Switch>
      )
    }
  }
  else {
    return (
      <Switch>
        <Route path="/" component={Index} />
        <Redirect to='/' />
      </Switch>
    )
  }
}

export default App;
