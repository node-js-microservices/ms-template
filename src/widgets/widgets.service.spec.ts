import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from 'src/prisma/prisma.service'
import { WidgetsService } from './widgets.service'

describe('WidgetsService', () => {
    let service: WidgetsService
   
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WidgetsService],
        }).compile()
        
        service = module.get<WidgetsService>(WidgetsService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
