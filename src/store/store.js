import { createStore } from '@reduxjs/toolkit';
import middleware from './middleware';
import reducer from './reducers';

// TODO: use non-deprecated approach
const store = createStore(reducer, middleware);

export default store;