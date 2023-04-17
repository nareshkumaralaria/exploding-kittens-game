import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../redux/reducers/reducers';

const store = configureStore({
    reducer: rootReducer,
    // devTools: process.env.NODE_ENV !== 'production',
    devTools: window.devToolsExtension && window.devToolsExtension(),
});

export default store;