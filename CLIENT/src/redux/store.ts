import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers/reducers';

const configStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};

const store = configStore();
export default store;
