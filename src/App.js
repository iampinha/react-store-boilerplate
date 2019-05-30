import React from 'react';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import rootSaga from './sagas';
import { AppRouter } from './components/AppRouter';

const store = configureStore({});
store.runSaga(rootSaga);

export const App = ({ children }) => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);


export default App;
