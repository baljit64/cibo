import './App.css';
import Login from './components/pages/Login/Login';
import Location from './components/pages/Location/Location';
import Navbar from './components/pages/Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/location" component={Location} />
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Navbar} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
