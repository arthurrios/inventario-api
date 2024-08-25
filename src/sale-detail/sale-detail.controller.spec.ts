import { Test, TestingModule } from '@nestjs/testing';
import { SaleDetailController } from './sale-order-detail.controller';
import { OrderItemService } from './sale-detail.service';

describe('SaleDetailController', () => {
  let controller: SaleDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaleDetailController],
      providers: [OrderItemService],
    }).compile();

    controller = module.get<SaleDetailController>(SaleDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
