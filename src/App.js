import Login from './components/store/container/LoginContainer';
import Location from './components/pages/Location/Location';
import Home from './components/pages/Home/Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/location" component={Location} />
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
