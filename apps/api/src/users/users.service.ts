import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { IGitUsersRequest, IGitUsersResponse } from '@dpg-code-challenge/data';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class UsersService {
  constructor(private httpService: HttpService) {}

  findAll({
    limit,
    page,
    name,
  }: IGitUsersRequest): Observable<AxiosResponse<IGitUsersResponse>> {
    return this.httpService.get(
      `https://api.github.com/search/users?q=${name} in:login&sort=stars&order=desc&page=${page}&per_page=${limit}`
    );
  }
}
