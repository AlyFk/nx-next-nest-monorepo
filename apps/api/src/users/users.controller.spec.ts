import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getMockUsers } from '@dpg-code-challenge/data';
import { CacheModule } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  const limit = 10;
  const page = 1;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest
              .fn()
              .mockImplementation(() => of(getMockUsers(page, limit))),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('findAll()', () => {
    it('should find all users ', async () => {
      const data = await controller.findAll({ page, limit, name: 'test' });
      data.subscribe((res) => {
        expect(res).toEqual(getMockUsers(page, limit));
      });
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });
});
