import { Test, TestingModule } from '@nestjs/testing';
import { SellerAccountController } from './seller-account.controller';

describe('SellerAccountController', () => {
  let controller: SellerAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SellerAccountController],
    }).compile();

    controller = module.get<SellerAccountController>(SellerAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
