import { AppDispatch } from "../store";
import { StoreSchema } from "../StoreSchema";

export type TWebSocketCallback<T> = (state: StoreSchema, dispatch: AppDispatch) => (args: T) => void;

export type TWebSocketEmitter<T> = {
    id: string;
    event: string;
    data: T;
}

export type TWebSocketListener<T> = {
    id: string;
    event: string;
    callback: TWebSocketCallback<T>;
}

export type TWebSocketIntervalEmitter<T> = (data: T) => {
    id: string;
    event: string;
    data: T;
    interval: number;
}

type TWebSocketConnectionParams = {
    uri: string;
    transports: Partial<['websocket', 'polling']>;
    emitters?: TWebSocketEmitter<never>[];
    intervalEmitters?: TWebSocketIntervalEmitter<unknown>[];
    listeners: TWebSocketListener<never>[];
}

export type TWebSocketConnectAction = {
    type: "ws:connect",
    payload: TWebSocketConnectionParams;
}
