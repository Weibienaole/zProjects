import { Provider } from 'react-redux'
import { ErrorBoundary } from 'zzy-javascript-devtools'

import Route from './router'
import GlobalStyle from './style'

import store from './store'

const App = () => {
  return (
    <>
      <ErrorBoundary mode={process.env.NODE_ENV}>
        <Provider store={store}>
          <GlobalStyle />
          <Route />
        </Provider>
      </ErrorBoundary>
    </>
  )
}
export default App
