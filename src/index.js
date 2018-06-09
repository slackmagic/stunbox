import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';


//import './css/index.css';
//import './css/bootstrap.lumen.css';
import './semantic/dist/semantic.min.css'
//import 'bootstrap/dist/css/bootstrap.min.css';

import PrivateRoute from './utils/auth/PrivateRoute';
import registerServiceWorker from './registerServiceWorker';

import Login from './containers/login/Login';
import Users from './containers/usermgr/umApp';
import UserDetail from './containers/usermgr/user/umDetail';
import GrimoireDashboard from './containers/grimoire/grimDashboard';
import GrimoireItems from './containers/grimoire/itemlist/grimItemList';
import GrimoireItem from './containers/grimoire/itemlist/grimItem';
import GrimoireCollection from './containers/grimoire/collection/grimCollection';
import MainApp from './containers/main/main';


ReactDOM.render(
  <Router>
    <div>
      <Route exact path='/' component={MainApp} />
      <Route path='/login' component={Login} />

      <PrivateRoute exact path='/grimoire' component={GrimoireDashboard} />
      <PrivateRoute exact path='/grimoire/:typeid' component={GrimoireItems} />
      <PrivateRoute exact path='/grimoire/:typeid/bycollection/:collid' component={GrimoireItems} />
      <PrivateRoute exact path='/grimoire/:typeid/bysupport/:supportid' component={GrimoireItems} />
      <PrivateRoute exact path='/grimoire/item/:itemid' component={GrimoireItem} />
      <PrivateRoute exact path='/grimoire/collection/:collid' component={GrimoireCollection} />
      <PrivateRoute exact path='/usermgr' component={Users} />
      <PrivateRoute path='/usermgr/:uuid' component={UserDetail} />
    </div>
  </Router>,
  document.getElementById('root')
);

registerServiceWorker();
