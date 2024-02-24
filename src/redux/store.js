import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

const giphy = (state = [], action) => {
  switch (action.type) {
    case 'SET_IMAGES':
      return action.payload;
    default:
      return state;
  }
};

//Giphy SAGA
function* searchGiphySaga(action) {
  //try catch block
  try {
    const searchResult = yield axios.post('/api/giphy/search', {
      searchTerm: action.payload.name,
    });
    yield put({ type: 'SET_IMAGES', payload: searchResult.data });
  } catch (error) {
    console.log('Error:', error);
  }
}

// SAGA
const sagaMiddleware = createSagaMiddleware();

//registers sagas
function* watcherSaga() {
  yield takeEvery('SEARCH_GIPHY', searchGiphySaga);
}

// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
// Note that the store is currently not
// configured to utilize redux-saga OR
// redux logger!
const store = createStore(
  combineReducers({ giphy }),
  applyMiddleware(sagaMiddleware, logger)
);
// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

sagaMiddleware.run(watcherSaga);

export default store;
