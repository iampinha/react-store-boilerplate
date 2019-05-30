import { combineReducers } from 'redux';
import { generateStoreItem } from '../lib';

// Generate them xD
const users = generateStoreItem('USERS');
const places = generateStoreItem('PLACES');

// export them
export const selectors = {
  users: users.selector,
  places: places.selector
}

export const actions = {
  users: users.actions,
  places: places.actions
}

export const reducers = {
  users: users.reducer,
  places: places.reducer
}

export const rootReducer = combineReducers({
  ...reducers
});

export const types = {
  USERS: users.type,
  PLACES: places.type
};
