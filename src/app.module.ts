import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as controllers from './my-controllers';

@Module({
  imports: [],
  controllers: [AppController, ...Object.values(controllers)],
  providers: [AppService],
})
export class AppModule {}
