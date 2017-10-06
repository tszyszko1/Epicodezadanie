import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// import App from './components/app';
import ProjectDetail from './components/project_detail';
import ProjectNew from './components/project_new';
import ProjectsList from './containers/projects_list';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <MuiThemeProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/projekt/nowy" component={ ProjectNew } />
          <Route path="/projekt/:id" component={ ProjectDetail } />
          <Route path="/" component={ ProjectsList } />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>
  , document.querySelector('.container'));
