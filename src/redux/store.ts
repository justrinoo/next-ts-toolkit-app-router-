import { configureStore } from '@reduxjs/toolkit';
// import userLoginReducer from './features/loginSlice';
import { loginApi } from './services/loginApi';
import { productApi } from './services/productApi';
import { productCategoryApi } from './services/productCategoryApi';
import { productVariantApi } from './services/productVariantApi';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const store = configureStore({
    reducer: {
        [loginApi.reducerPath]: loginApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [productCategoryApi.reducerPath]: productCategoryApi.reducer,
        [productVariantApi.reducerPath]: productVariantApi.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware: any) =>
        getDefaultMiddleware({}).concat(
            [loginApi.middleware],
            [productApi.middleware],
            [productCategoryApi.middleware],
            [productVariantApi.middleware]
        ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
