import { take, put, call, fork, all } from 'redux-saga/effects';
import { Places, Users } from '../services';
import { methodsArr, status } from '../lib'
import { actions, types } from '../store';

const { REQUEST } = status;

// Set handlers
const handlers = [
  { name: 'users', service: Users },
  { name: 'places', service: Places },
]

/**
 * Dynamic stuff
 */

const fromApi = {
  ...handlers.reduce((acc, handler) => ({
    ...acc,
    [handler.name]: methodsArr.reduce((innerAcc, method) => ({
      ...innerAcc,
      [method.toLowerCase()]: data => request.bind(null, actions[handler.name], handler.service[method], method.toLowerCase(), data)
    }), {})
  }), {}),
}

function* request(entity, apiFn, requestType, data) {
  try {
      const r = yield call(data ? () => apiFn(data) : apiFn);

      yield put(entity[requestType].success(r));
  } catch (error) {
      yield put(entity[requestType].failure(error));
  }
}

function* methodRequest(method, type, data) {
  yield call(fromApi[type][method](data));
}

function* watchMethodsRequest(method) {
  while(true) {
      const { payload, type } = yield take(handlers.map(({ name }) => types[name.toUpperCase()][`${method.toUpperCase()}_${REQUEST}`]));
      const action = call(() => methodRequest(method, type.split('_')[0].toLowerCase(), payload));

      yield action;
  }
}

const delRequests = watchMethodsRequest.bind(null, 'del');
const getRequests = watchMethodsRequest.bind(null, 'get');
const postRequests = watchMethodsRequest.bind(null, 'post');
const putRequests = watchMethodsRequest.bind(null, 'put');

export default function* root() {
  yield all([
      fork(delRequests),
      fork(getRequests),
      fork(postRequests),
      fork(putRequests),
  ]);
}