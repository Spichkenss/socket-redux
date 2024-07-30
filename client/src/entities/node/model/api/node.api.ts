import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { TSocketNodeEvents } from "@/shared/socket/index.ts";
import { SocketController } from "@/shared/socket/SocketController";

import { NodeSchema } from "../node.types.ts";

export const nodeApi = createApi({
    baseQuery: fetchBaseQuery({}),
    reducerPath: 'api/node',
    keepUnusedDataFor: 300,
    refetchOnMountOrArgChange: true,
    endpoints: (builder) => ({
        getNodeData: builder.query<NodeSchema, string>({
            queryFn: (nodeId) => {
                return new Promise((resolve, reject) => {

                    const connection = new SocketController<TSocketNodeEvents>({
                        uri: "http://localhost:7777/node",
                        options: {
                            transports: ['websocket']
                        }
                    })

                    const triggerEvent = (nodeId: string) => {
                        connection.emitEvent<{id: string}>(
                            "node:on-data-request",
                            {
                                id: nodeId
                            },
                        )
                    };

                    const onDataReceived = (callback: (data: NodeSchema) => void) => {
                        connection.registerListener("node:on-data-receive", callback);
                    };

                    const handleDataReceive = (newData: NodeSchema) => {
                        resolve({ data: newData });
                        connection.removeListener("node:on-data-receive");
                    };

                    triggerEvent(nodeId);
                    onDataReceived(handleDataReceive);

                    setTimeout(() => {
                        connection.removeAllListeners();
                        reject({ error: new Error('Timeout') });
                    }, 10000);
                });
            }
        })
    }),
});

export const { useGetNodeDataQuery } = nodeApi;
