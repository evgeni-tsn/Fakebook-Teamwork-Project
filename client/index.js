import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import routes from './routes'

// import { AppContainer } from 'react-hot-loader'

const rootElement = document.getElementById('app')

ReactDOM.render(<Router history={browserHistory} routes={routes}/>, rootElement)

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
