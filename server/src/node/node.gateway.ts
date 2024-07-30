import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway(7777, {
  transports: ['websocket'],
  namespace: 'node',
  cors: { origin: 'http://localhost:5173' },
})
export class NodeGateway {
  @SubscribeMessage('node:on-data-request')
  handleMessage(
    @MessageBody() body: { id: string },
    @ConnectedSocket() client: Socket,
  ) {
    const statuses = ['normal', 'migrate', 'error'];
    const name = `NODE-${body.id}`;

    Logger.log(body);

    const randomIndex = Math.floor(Math.random() * statuses.length);

    const response = {
      ...body,
      name,
      status: statuses[randomIndex],
    };

    client.emit('node:on-data-receive', response);
  }
}
