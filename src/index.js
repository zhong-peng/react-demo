import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import {
  Login,
  NotFound
} from './pages'

import zhCN from 'antd/lib/locale-provider/zh_CN'

import {
  LocaleProvider
} from 'antd'

import App from './App';

import './index.less';

import store from './store'

// 如果不加下面这三句，那么日期选择就洋不洋土不土的
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

ReactDOM.render(
  <Provider store={store}>
    <LocaleProvider locale={zhCN}>
      <Router>
        <Switch>
          <Route path="/admin" component={App} />
          <Route path="/login" component={Login} />
          <Route path="/404" component={NotFound} />
          <Redirect to="/admin" from="/" exact />
          <Redirect to="/404" />
        </Switch>
      </Router>
    </LocaleProvider>
  </Provider>,
  document.getElementById('root')
);
