import { TSocketBaseEvents } from "./socket.base-events";
import { TSocketNodeEvents } from "./socket.node-events";

export type TSocketEvents = TSocketBaseEvents | TSocketNodeEvents;
