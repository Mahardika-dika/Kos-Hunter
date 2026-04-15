import { Module } from '@nestjs/common';
import { KosService } from './kos.service';
import { KosController } from './kos.controller';
import { AiService } from 'src/ai/ai.service';

@Module({
  controllers: [KosController],
  providers: [KosService, AiService],
})
export class KosModule {}
