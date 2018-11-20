// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import FrontPage from './Component/FrontPage';
import NavBar from './Component/NavBar';
import SideMeny from './Component/sideMeny';
import articleDetails from './Component/ArticleDetails';
import kategori from './Component/Kategori';
import articlePost from './Component/ArticlePost';



// Reload application when not in production environment
if (process.env.NODE_ENV !== 'production') {
  let script = document.createElement('script');
  script.src = '/reload/reload.js';
  if (document.body) document.body.appendChild(script);
}

import createHashHistory from 'history/createHashHistory';
export const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student


const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
      <div>
          <NavBar/>
          <div className="row">
          <div className="col-sm-10">
          <Route exact path ="/" component={FrontPage} />
          <Route exact path ="/article/:id" component={articleDetails} />
          <Route exact path ="/article/kategori/:kategori" component={kategori} />
          <Route exact path ="/article/post" component={articlePost} />
          </div>
              <SideMeny/>
          </div>
      </div>
    </HashRouter>,
    root
  );
