import {NodeSchema} from "../../entities/node";
import {EntityState} from "@reduxjs/toolkit";
import {TWebSocketListenersState} from "./slices/webSocketListeners.slice.ts";

export type StoreSchema = {
    node: EntityState<NodeSchema, string>;
    listeners: TWebSocketListenersState;
};