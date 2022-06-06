import { IsNumber, IsOptional, Min, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { IGitUsersRequest } from '@dpg-code-challenge/data';

export class SearchUserDto implements IGitUsersRequest {
  @IsString()
  public username: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  public page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  public limit?: number = 10;
}
