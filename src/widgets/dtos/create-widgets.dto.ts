import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
export class CreateWidgetDto {
  @ApiProperty({description: 'Name of the widget'})
    @IsString()
    readonly name: string
}
