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
import EditIncomingSupport from './views/EditIncomingSupport';
import SupportForm from './components/SupportForm';
import IncomingSupports from './views/IncomingSupport';
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
import CreateSupport from './views/CreateSupport';

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
          <Route exact path="/create-support" component={CreateSupport} />
          <Route path="/data/:id" component={PersonalData} />
          <Route path="/incoming-supports" render={(props) => <IncomingSupports {...props} warehouseId={user.warehouseId} />} />
          <Route path="/EditIncomingSupport/:id" render={(props) => <EditIncomingSupport {...props} user={user} />} />
          <Route path="/support/edit/:id" render={(props) => <EditSupport {...props} user={user} />} />
          <Route path="/need/edit/:id" render={(props) => <EditNeed {...props} user={user} />} />
          <Route path="/confirmed_support/edit/:id" render={(props) => <EditConfirmedSupport {...props} user={user} />} />
          <Route path="/confirmed_need/edit/:id" render={(props) => <EditConfirmedNeed {...props} user={user} />} />
          <Route path="/turkey-map/:city" component={City} />
          <Route path="/warehouse" render={(props) => <Warehouse {...props} warehouseId={user.warehouseId} />} />
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
