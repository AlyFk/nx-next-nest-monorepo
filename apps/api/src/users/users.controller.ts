import {
  CacheInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { map } from 'rxjs';
import { SearchUserDto } from './dto/search-user.dto';
import { UsersService } from './users.service';

@UseInterceptors(CacheInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Query() { username, limit, page }: SearchUserDto) {
    try {
      const data = this.usersService.findAll({ limit, page, username });
      return data.pipe(map((res) => res.data));
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}
