import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
} from '@nestjs/common'
import { CreateWidgetDto } from './dtos/create-widgets.dto'
import { PaginationQueryDto } from './../common/dtos/pagination-query.dto'
import { UpdateWidgetDto } from './dtos/update-widgets.dto'
import { WidgetsService } from './widgets.service'
import { Public } from 'src/common/decorators/public.decorator'
import { Widget } from '@prisma/client'
@Controller('widgets')
export class WidgetsController {
    constructor(private readonly widgetsService: WidgetsService) {}
   @Public() 
    @Get()
    findAll(@Query() paginationQuery: PaginationQueryDto) {
        return this.widgetsService.findAll({...paginationQuery})
    }
  @Get(':id')
   findOne(@Param('id', ParseIntPipe) id: number): Promise<Widget> {
       return this.widgetsService.findOne(id)
   }
  @Post()
  create(@Body() createWidgetDto: CreateWidgetDto) {
      return this.widgetsService.create(createWidgetDto)
  }
  @Patch(':id')
  update(@Body() updateWidgetDto: UpdateWidgetDto, @Param('id') id: number) {
      return this.widgetsService.update(id, updateWidgetDto)
  }
  @Delete(':id')
  delete(@Param('id') id: number) {
      return this.widgetsService.remove(id)
  }
}
