import {Middleware} from "@reduxjs/toolkit";
import {io, Socket} from "socket.io-client";

export const SocketMiddleware: Middleware = ({getState, dispatch}) => (next) => (action) => {
    let connection: Socket | null = null;

    switch (action.type) {
        case "ws:connect": {
            connection = io(action.payload.uri, { transports: action.payload.transports});

            action.payload.intervalEmitters.map(emitter => {
                    setInterval(
                        () => connection?.emit(
                            emitter.event,
                            emitter.data
                        ), emitter.interval)
                }
            );

            action.payload.listeners.map(listener => {
                connection?.on(listener.event, listener.callback(getState(), dispatch))
            }
            );
        }
    }



    return next(action);
}