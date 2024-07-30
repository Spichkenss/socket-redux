import { io, ManagerOptions, Socket, SocketOptions } from "socket.io-client";

import { TSocketEvents } from "./events/socket.events";

type TSocketControllerDTO = {
  uri: string;
  options: Partial<ManagerOptions & SocketOptions>;
};

type TSocketRegisterListenerCallback<TResponse = unknown> = (data: TResponse) => void;

export class SocketController<TEvent extends TSocketEvents> {
  private socket: Socket | null = null;

  constructor({ uri, options }: TSocketControllerDTO) {
    this.socket = io(uri, options);
  }

  public emitEvent<TData>(
    event: TEvent,
    data: TData,
  ): this {
    if (!this.socket)
      throw new Error("Can't register listener! Socket instance is null!");

    this.socket.emit(event, data);

    return this;
  }

  public registerListener<TResponse>(
    event: TEvent,
    callback: TSocketRegisterListenerCallback<TResponse>
  ): this {
    if (!this.socket)
      throw new Error("Can't register listener! Socket instance is null!");

    this.socket.on(event as string, callback);

    return this;
  }

  public removeListener(
    event?: TEvent,
    callback?: TSocketRegisterListenerCallback
  ): this {
    if (!this.socket)
      throw new Error("Can't remove listener! Socket instance is null!");

    if (!event) this.socket.off();

    this.socket.off(event as string, callback);

    return this;
  }

  public removeAllListeners(): this {
    if (!this.socket)
      throw new Error("Can't remove all listeners! Socket instance is null!");

    this.socket.off()

    return this;
  }

  public disconnect(): this {
    if (!this.socket)
      throw new Error("Can't disconnect! Socket instance is null!");

    this.socket.disconnect();

    return this;
  }

  public reconnect(): this {
    if (!this.socket)
      throw new Error("Can't reconnect! Socket instance is null!");

    this.socket.connect();

    return this;
  }
}
