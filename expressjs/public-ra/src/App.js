import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import WRoleNavigation from './components/WRoleNavigation';
import LoginNavigation from './components/LoginNavigation';
import EditSupport from './views/EditSupport';
import EditNeed from './views/EditNeed';
import ConfirmedSupports from './views/ConfirmedSupports';
import ConfirmedNeeds from './views/ConfirmedNeeds';
import EditConfirmedSupport from './views/EditConfirmedSupport';
import EditConfirmedNeed from './views/EditConfirmedNeed';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import TurkeyMap from './views/TrMap';
import City from './views/City';
import NotConfirmedNeeds from './views/NotConfirmedNeeds';
import NotConfirmedSupports from './views/NotConfirmedSupports';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import "./public/css/style.css";
import PersonalData from './views/PersonalData';
import Warehouse from './views/Warehouse';

function App() {
  const [userResponse, setUserResponse] = useState([]);
  const [user, setUser] = useState([]);
  
  useEffect(() => {
    fetch("/api/auth")
      .then((res) => res.json())
      .then((data) => {
        setUserResponse(data.message);
        setUser(data.user);
      })
      .catch((err) => console.log(err));
  }, []);

  const renderRoutes = (navigationComponent) => (
    <Router>
      <div className="App">
        {navigationComponent}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Register} />
          <Route exact path="/turkey-map" component={TurkeyMap} />
          <Route exact path="/confirmed_supports" component={ConfirmedSupports} />
          <Route exact path="/not_confirmed_needs" component={NotConfirmedNeeds} />
          <Route exact path="/not_confirmed_supports" component={NotConfirmedSupports} />
          <Route exact path="/confirmed_needs" component={ConfirmedNeeds} />
          <Route path="/data/:id" component={PersonalData} />
          <Route path="/support/edit/:id" component={EditSupport} />
          <Route path="/need/edit/:id" render={(props) => <EditNeed {...props} user={user} />} />
          <Route path="/confirmed_support/edit/:id" component={EditConfirmedSupport} />
          <Route path="/confirmed_need/edit/:id" render={(props) => <EditConfirmedNeed {...props} user={user} />} />
          <Route path="/turkey-map/:city" component={City} />
          <Route exact path="/warehouse" component={Warehouse} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );

  if (userResponse === "LOGGED_IN") {
    return renderRoutes(<LoginNavigation username={user.firstname + " " + user.lastname} />);
  } else if (userResponse === "LOGGED_IN_WAREHOUSE") {
    return renderRoutes(<WRoleNavigation username={user.firstname + " " + user.lastname} />);
  } else {
    return renderRoutes(<Navigation />);
  }
}

export default App;
