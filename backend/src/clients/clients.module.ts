import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { AuthModule } from 'src/auth/auth.module';
import { Client, ClientSchema } from './entities/client.entity';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: Client.name,
        schema: ClientSchema
      }
    ])
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [MongooseModule,ClientsService]
})
export class ClientsModule {}
