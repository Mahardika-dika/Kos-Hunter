import { Module } from '@nestjs/common';
import { KosService } from './kos.service';
import { KosController } from './kos.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AiService } from 'src/ai/ai.service';

@Module({
  controllers: [KosController],
  providers: [KosService, PrismaService, AiService],
})
export class KosModule {}
