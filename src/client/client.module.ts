import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { Client, ClientSchema } from './client.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Client.name,
        schema: ClientSchema,
      },
    ]),
  ],
  providers: [ClientService],
  controllers: [ClientController],
})
export class ClientModule {}
