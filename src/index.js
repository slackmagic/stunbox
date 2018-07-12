import React from 'react';
import ReactDOM from 'react-dom';
import {
  Router,
  Route
} from 'react-router-dom';

import './semantic/dist/semantic.min.css'

import PrivateRoute from './services/stunbox/auth/privateRoute';
import registerServiceWorker from './registerServiceWorker';

import Login from './containers/login/login';
import Users from './containers/usermgr/umApp';
import UserDetail from './containers/usermgr/user/umDetail';
import GrimoireDashboard from './containers/grimoire/grimDashboard';
import GrimoireItems from './containers/grimoire/itemlist/grimItemList';
import GrimoireItem from './containers/grimoire/itemlist/grimItem';
import GrimoireCollection from './containers/grimoire/collection/grimCollection';
import MainApp from './containers/main/main';
import History from './services/stunbox/history/history'

ReactDOM.render(
  <Router history={History}>
    <div>
      <Route exact path='/' component={MainApp} />
      <Route path='/login' component={Login} />

      <PrivateRoute exact path='/grimoire' component={GrimoireDashboard} />
      <PrivateRoute exact path='/grimoire/item/new/:collid' component={GrimoireItem} />
      <PrivateRoute exact path='/grimoire/item/edit/:itemid' component={GrimoireItem} />
      <PrivateRoute exact path='/grimoire/item/read/:typeid' component={GrimoireItems} />
      <PrivateRoute exact path='/grimoire/item/read/:typeid/bysupport/:supportid' component={GrimoireItems} />
      <PrivateRoute exact path='/grimoire/collection/new' component={GrimoireCollection} />
      <PrivateRoute exact path='/grimoire/collection/edit/:collid' component={GrimoireCollection} />
      <PrivateRoute exact path='/grimoire/collection/read/:collid' component={GrimoireItems} />
      <PrivateRoute exact path='/usermgr' component={Users} />
      <PrivateRoute path='/usermgr/:uuid' component={UserDetail} />
    </div>
  </Router>,
  document.getElementById('root')
);

registerServiceWorker();
