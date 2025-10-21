import { Injectable } from '@nestjs/common';
import axios from 'axios';
import {
  IGetByIdParams,
  IGetByIdResponse,
  IHttpUsersService,
  IUpdateEmailBody,
} from './interfaces/http-users.interface';
import { ConfigService } from '@nestjs/config';
import { ProxyError } from '../errors';

@Injectable()
export class HttpUsersService implements IHttpUsersService {
  private baseUrl: string;

  constructor(configService: ConfigService) {
    const usersApiUrl = configService.get('http.usersApiUrl')!;

    this.baseUrl = `${usersApiUrl}/users`;
  }

  async getById(params: IGetByIdParams) {
    try {
      const response = await axios.get<IGetByIdResponse>(
        `${this.baseUrl}/${params.userId}`,
      );

      return response.data;
    } catch (err) {
      throw new ProxyError(err);
    }
  }

  async updateEmail(userId: string, body: IUpdateEmailBody) {
    try {
      const response = await axios.put(
        `${this.baseUrl}/${userId}/update-email`,
        body,
      );

      return response.data;
    } catch (err) {
      throw new ProxyError(err);
    }
  }
}
