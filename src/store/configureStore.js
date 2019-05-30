import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import sagaMonitor from '@redux-saga/simple-saga-monitor';
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer } from './';

export default function configureStore(initialState) {
    const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
    const store = createStore(
        rootReducer,
        initialState,
        composeWithDevTools(
            applyMiddleware(sagaMiddleware)
        ),
    );

    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);
    return store;
}
