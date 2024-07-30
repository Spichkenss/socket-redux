import {createEntityAdapter, createSlice, EntityState, PayloadAction} from "@reduxjs/toolkit";
import {NodeSchema} from "../node.types";

export const nodeEntityAdapter = createEntityAdapter<NodeSchema>({
    sortComparer: (a, b) => a.name.localeCompare(b.name)
})

const nodeSlice = createSlice({
    name: "node",
    initialState: nodeEntityAdapter.getInitialState<EntityState<NodeSchema, string>>({
        entities: {},
        ids: []
    }),
    selectors: {
        selectAllNodes: (sliceState) => {
            return nodeEntityAdapter
                .getSelectors()
                .selectAll(sliceState);
        },
        selectNodeById: (sliceState, nodeId: string) => {
            return nodeEntityAdapter
                .getSelectors()
                .selectById(sliceState, nodeId);
        },
    },
    reducers: {
        setNodes: (state, action: PayloadAction<NodeSchema[]>) => {
            nodeEntityAdapter.setAll(state, action.payload)
        },
        updateNode: (state, action: PayloadAction<NodeSchema>) => {
            nodeEntityAdapter.updateOne(state, {
                id: action.payload.id,
                changes: action.payload
            })
        },
    }
})

export const {
    actions: nodeActions,
    reducer: nodeReducer,
    selectors: nodeSelectors,
    name: nodeSliceName,
} = nodeSlice;