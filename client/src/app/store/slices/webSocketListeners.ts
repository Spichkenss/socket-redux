import {TWebSocketIntervalEmitter, TWebSocketListener} from "./webSocketListeners.types.ts";
import {nodeActions, NodeSchema} from "../../../entities/node";

export const nodeDataRequestEmitter: TWebSocketIntervalEmitter<NodeSchema> = (data: NodeSchema) => ({
    id: "node:on-data-request",
    event: "node:on-data-request",
    interval: 3000,
    data,
})

export const nodeDataReceiveListener: TWebSocketListener<NodeSchema> = {
    id: "node:on-data-receive",
    event: "node:on-data-receive",
    callback: (_, dispatch) => (node) => {
        console.log(node)
        dispatch(nodeActions.updateNode(node))
    },
}