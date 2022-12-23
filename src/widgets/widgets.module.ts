import { Module } from '@nestjs/common'
import { WidgetsController } from './widgets.controller'
import { WidgetsService } from './widgets.service'
import { PrismaModule } from '../prisma/prisma.module'
import { PrismaService } from 'src/prisma/prisma.service'
import { ConfigModule } from '@nestjs/config'
import prismaConfig from 'src/prisma/prisma.config'
@Module({
    imports: [PrismaModule, ConfigModule.forFeature(prismaConfig)],
    controllers: [WidgetsController],
    providers: [
        WidgetsService, 
        PrismaService
    ] 
})
export class WidgetsModule {}
