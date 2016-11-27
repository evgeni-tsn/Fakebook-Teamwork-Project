import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import routes from './routes'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

// import { AppContainer } from 'react-hot-loader'

const rootElement = document.getElementById('app')
const store = createStore(
  (state = {}) => state,
  applyMiddleware(thunk)
)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>, rootElement)

// if (module.hot) {
//   module.hot.accept(App, () => {
//     ReactDOM.render(
//       <AppContainer>
//         <App />
//       </AppContainer>,
//       rootElement
//     );
//   });
// }
