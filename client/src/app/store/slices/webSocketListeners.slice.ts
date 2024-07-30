import {createEntityAdapter, createSlice, EntityState, PayloadAction} from "@reduxjs/toolkit";

type TEventName = string;

type TWebSocketCallback = <T>(args: T) => void;

type TWebSocketListener = {
    id: string;
    event: TEventName;
    callback: TWebSocketCallback;
}

export type TWebSocketOneTimeListener = TWebSocketListener;

export type TWebSocketIntervalListener = TWebSocketListener & {
    interval: number;
}

export type TWebSocketListenersState = {
    oneTimeListeners: EntityState<TWebSocketOneTimeListener, string>;
    intervalListeners: EntityState<TWebSocketIntervalListener, string>;
}

const webSocketOneTimeListenersEntityAdapter = createEntityAdapter<TWebSocketOneTimeListener>({
    sortComparer: (a, b) => a.id.localeCompare(b.id),
})

const webSocketIntervalListenersEntityAdapter = createEntityAdapter<TWebSocketIntervalListener>({
    sortComparer: (a, b) => a.id.localeCompare(b.id),
})

const initialState: TWebSocketListenersState = {
    oneTimeListeners: webSocketOneTimeListenersEntityAdapter.getInitialState(),
    intervalListeners: webSocketIntervalListenersEntityAdapter.getInitialState(),
}

const webSocketListenersSlice = createSlice({
    name: "wsListeners",
    initialState,
    reducers: {
        addWebSocketOneTimeListener: (state, action: PayloadAction<TWebSocketOneTimeListener>) => {
            webSocketOneTimeListenersEntityAdapter.addOne(state.oneTimeListeners, action.payload)
        },
        addWebSocketIntervalListener: (state, action: PayloadAction<TWebSocketOneTimeListener>) => {
            webSocketOneTimeListenersEntityAdapter.addOne(state.intervalListeners, action.payload)
        },
        removeWebSocketOneTimeListener: (state, action: PayloadAction<TWebSocketOneTimeListener>) => {
            webSocketOneTimeListenersEntityAdapter.removeOne(state.oneTimeListeners, action.payload.id)
        },
        removeWebSocketIntervalListener: (state, action: PayloadAction<TWebSocketOneTimeListener>) => {
            webSocketOneTimeListenersEntityAdapter.removeOne(state.intervalListeners, action.payload.id)
        },
    }
})

export const {
    reducer: webSocketReducer,
    actions: webSocketActions,
    name: webSocketSliceName
} = webSocketListenersSlice;