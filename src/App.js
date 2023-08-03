import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Home from 'features/home/Home';
import Profile from 'features/profile/Profile.js';
import CreateAsset from 'features/wallet/CreateAsset';
import Admin from 'layouts/Admin.js';
import Auth from 'layouts/Auth.js';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
    <Switch>
        {/* add routes with layouts */}
        <Route path="/landing" exact component={Home}/>
        <Route path="/admin" component={Admin}/>
        <Route path="/auth" component={Auth}/>
        {/* add routes without layouts */}
        <Route path="/profile" exact component={Profile}/>
        <Route path="/" exact component={Home}/>
        <Route path="/asset/create" exact component={CreateAsset}/>
        {/* add redirect for first page */}
        <Redirect from="*" to="/"/>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
