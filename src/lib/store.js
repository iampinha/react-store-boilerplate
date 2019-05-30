export const methods = {
  DEL: 'DEL',
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT'
};

export const status = {
  REQUEST: 'REQUEST',
  FAILURE: 'FAILURE',
  SUCCESS: 'SUCCESS'
};

export const statusArr = Object.keys(status).reduce((acc, stts) => [...acc, status[stts]], []);
export const methodsArr = Object.keys(methods).reduce((acc, method) => [...acc, methods[method]], []);

const { REQUEST, FAILURE, SUCCESS } = status;

const setAction = (type, payload = {}) => ({ type, ...payload });

const createTypes = base => ({
  ...methodsArr.reduce((acc, method) => ({
    ...acc,
    ...statusArr.reduce((innerAcc, stts) => ({
      ...innerAcc,
      [`${method}_${stts}`]: `${base}_${method}_${stts}`,
    }), {})
  }), {})
});

const generateAction = (method, type) => ({
  [method.toLowerCase()]: statusArr.reduce((acc, stts) => ({
    ...acc,
    [`${stts.toLowerCase()}`]: payload => setAction(type[`${method}_${stts}`], { payload })
  }), {})
});

const createReducer = (initialState = {}, handlers) =>
  (state = initialState, action) =>
    handlers.hasOwnProperty(action.type)
      ? handlers[action.type](state, action)
      : state
;

const getEntities = (arr, idKey = 'id') => {
  return arr.reduce((acc, item) => ({ ...acc, [item[idKey]]: item }), {});
};

export const generateStoreItem = (typeStr, { initialState, pure, ...options } = {}) => {
  const type = createTypes(typeStr);

  return {
    // Actions
    actions: methodsArr.reduce((acc, method) => ({
      ...acc,
      ...generateAction(method, type),
    }), {}),

    // Reducer
    reducer: createReducer(initialState, methodsArr.reduce((acc, method) => ({
      ...acc,

      // Request
      [type[`${method}_${REQUEST}`]]: (state, action) => {
        return {
          ...state,
          loaded: false,
          loading: true,
          ...options[`${method}_${REQUEST}`] ? options[`${method}_${REQUEST}`]({ state, action }) || {} : {},
        };
      },

      // Success
      [type[`${method}_${SUCCESS}`]]: (state, action) => {
        return {
          ...state,
          loaded: true,
          loading: false,
          data: pure ? action.payload : getEntities(action.payload),
          ...options[`${method}_${SUCCESS}`] ? options[`${method}_${SUCCESS}`]({ state, action }) || {} : {},
        };
      },

      // Failure
      [type[`${method}_${FAILURE}`]]: (state, action) => {
        return {
          ...state,
          loaded: false,
          loading: true,
          ...options[`${method}_${FAILURE}`] ? options[`${method}_${FAILURE}`]({ state, action }) || {} : {},
        };
      },
    }), {})),

    // Selector
    selector: state => state[typeStr.toLowerCase()],

    // Type
    type
  }
}