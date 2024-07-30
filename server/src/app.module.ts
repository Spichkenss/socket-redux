import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NodeGateway } from './node/node.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, NodeGateway],
})
export class AppModule {}
