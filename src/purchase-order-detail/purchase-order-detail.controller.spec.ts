import { Test, TestingModule } from '@nestjs/testing';
import { OrderItemController } from './purchase-order-detail.controller';
import { OrderItemService } from './purchase-order-detail.service';

describe('OrderItemController', () => {
  let controller: OrderItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderItemController],
      providers: [OrderItemService],
    }).compile();

    controller = module.get<OrderItemController>(OrderItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
