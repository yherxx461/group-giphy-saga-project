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

const favoritesList = (state = [], action) => {
  switch (action.type) {
    case 'SET_FAVORITES':
      return action.payload;
    default:
      return state;
  }
};

//favorites SAGA
//Giphy SAGA
function* favoritesSaga(action) {
  //try catch block
  try {
    yield axios({
      method: 'POST',
      url: '/api/favorites',
      data: action.payload,
    });
  } catch (error) {
    console.log('error in POST favorites SAGA', error);
  }
}

// // POST to add element
// export function* postElementSaga(action) {
//   // try catch block
//   try {
//     // POST a new element to server
//     yield axios({
//       method: 'POST',
//       url: '/api/elements',
//       data: action.payload,
//     });

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
  yield takeEvery('SET_FAVORITES', favoritesSaga);
}

// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
// Note that the store is currently not
// configured to utilize redux-saga OR
// redux logger!
const store = createStore(
  combineReducers({ giphy, favoritesList }),
  applyMiddleware(sagaMiddleware, logger)
);
// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

sagaMiddleware.run(watcherSaga);

export default store;
