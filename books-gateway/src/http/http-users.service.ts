import { Injectable } from '@nestjs/common';
import axios from 'axios';
import {
  IGetByIdParams,
  IGetByIdResponse,
  IHttpUsersService,
} from './interfaces/http-users.interface';
import { ProxyError } from '../errors';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HttpUsersService implements IHttpUsersService {
  private baseUrl: string;

  constructor(configService: ConfigService) {
    const usersApiUrl = configService.get('http.usersApiUrl')!;

    this.baseUrl = `${usersApiUrl}/users`;
  }

  async getById(params: IGetByIdParams) {
    try {
      console.log('getById', params.userId);
      const response = await axios.get<IGetByIdResponse>(
        `${this.baseUrl}/${params.userId}`,
      );

      return response.data;
    } catch (err) {
      throw new ProxyError(err);
    }
  }
}
