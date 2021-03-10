import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login.controller';
import { LoginService } from '../../../services/login/login.service';
jest.mock('../../../services/login/login.service');

describe('LoginController', () => {
  //LoginController
  let controller: LoginController;
  let service: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [LoginService],
    }).compile();

    controller = module.get<LoginController>(LoginController);
    service = module.get<LoginService>(LoginService);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('GET /login expect return to be login', async () => {
    const result = 'login';
    //jest.spyOn(service, 'loginHandler').mockImplementation(async () => result);
    expect(await controller.login()).toBe(result);
  });
});
