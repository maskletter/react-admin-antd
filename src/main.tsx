import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Router } from './router'
import store from './store'
import './index.css'
import 'antd/dist/antd.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <Router />
    </Provider>
  </BrowserRouter>
)
