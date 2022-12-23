import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { CreateWidgetDto } from './dtos/create-widgets.dto'
import { UpdateWidgetDto } from './dtos/update-widgets.dto'
import { PrismaService } from '../prisma/prisma.service'
import { PaginationQueryDto } from '../common/dtos/pagination-query.dto'
import {  ConfigType } from '@nestjs/config'
import { Widget } from '@prisma/client'
import prismaConfig from 'src/prisma/prisma.config'
@Injectable()
export class WidgetsService {
    
    private readonly logger = new Logger(WidgetsService.name)
    constructor(
        private readonly prisma: PrismaService, 
        @Inject(prismaConfig.KEY)
        private readonly configService: ConfigType<typeof prismaConfig>
    ) {
    }

    findAll(params: PaginationQueryDto) {
        const { limit, offset} = params
        return this.prisma.widget.findMany({
            skip: offset,
            take: limit,
        })
    }

    async findOne(id: number): Promise<Widget> {
        const widget = await this.prisma.widget.findUnique({ where: { id } })
        if (!widget) {
            throw new NotFoundException(`Widget with id ${id} not found`)
        }
        return widget
    }

    async create(createWidgetDto: CreateWidgetDto) {
        const integrationEvent = createWidgetDto
        return this.prisma.$transaction([
            this.prisma.widget.create({data: {...createWidgetDto}}),
            this.prisma.integrationEvents.create({data:{name: 'widget_created', type: 'widget', payload: integrationEvent as any}})
        ])
    }
    
    async update(id: number, updateWidgetDto: UpdateWidgetDto) {
        try {
            const widget = await this.prisma.widget.update({
                where: { id },
                data: updateWidgetDto,
            })
            return widget
        } catch (error) {
            if (error.code === 'P2025') {
                throw new NotFoundException(`Widget with id ${id} not found`)
            }
            throw error
        }
    }
    
    async remove(id: number) {
        await this.findOne(id)
        return this.prisma.widget.delete({ where: { id } })
    }
}
