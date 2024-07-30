import {configureStore} from "@reduxjs/toolkit";
import {createDispatchHook, createSelectorHook} from "react-redux";

import {nodeReducer} from "@/entities/node";
import {nodeApi} from "@/entities/node/model/api/node.api.ts";

import {webSocketReducer} from "./slices/webSocketListeners.slice.ts";
import {SocketMiddleware} from "./socketMiddleware.ts";
import {StoreSchema} from "./StoreSchema";


export const createReduxStore = (preloadedState?: StoreSchema) => {

    return configureStore({
        preloadedState,
        reducer: {
            node: nodeReducer,
            listeners: webSocketReducer,
            [nodeApi.reducerPath]: nodeApi.reducer,
        },
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware()
                .concat([
                    SocketMiddleware,
                    nodeApi.middleware
                ]),
    })
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];

export const useAppDispatch = createDispatchHook().withTypes<AppDispatch>()
export const useAppSelector = createSelectorHook().withTypes<StoreSchema>()