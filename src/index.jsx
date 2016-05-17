import React from 'react';
import ReactDOM from 'react-dom';
import Router, {Route} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import reducer from './reducer';

//components
import App from './components/App';
import { ListContainer } from './components/List';

const store = createStore(reducer);

const routes = <Route component={App}>
  	<Route path="/" component={ListContainer} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <ListContainer />
  </Provider>,
  document.getElementById('app')
);