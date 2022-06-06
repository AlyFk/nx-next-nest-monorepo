import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { getMockUsers, IGitUsersResponse } from '@dpg-code-challenge/data';

const mockHttpService = () => ({
  get: jest.fn(),
});
describe('UsersService', () => {
  let service: UsersService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: HttpService,
          useValue: mockHttpService(),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should find users', () => {
    const limit = 10;
    const page = 1;
    const username = 'test';
    const data = getMockUsers(page, limit);
    const response: AxiosResponse<IGitUsersResponse> = {
      data,
      headers: {},
      config: { url: 'mockUrl' },
      status: 200,
      statusText: 'OK',
    };
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(response));
    service.findAll({ limit, page, username }).subscribe((res) => {
      expect(res).toEqual(data);
    });
  });
});
