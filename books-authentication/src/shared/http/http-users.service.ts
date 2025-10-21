import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import {
  ICreateUserBody,
  ICreateUserResponse,
  IHttpUsersService,
} from './interfaces';
import { IUsersApiConfig } from '../config/interfaces';

@Injectable()
export class HttpUsersService implements IHttpUsersService {
  private readonly usersApiConfig: IUsersApiConfig;

  constructor(configService: ConfigService) {
    this.usersApiConfig = configService.get('users-api') as IUsersApiConfig;
  }

  async createUser(body: ICreateUserBody) {
    try {
      const response = await axios.post<ICreateUserResponse>(
        `${this.usersApiConfig.url}/users`,
        body,
      );

      return response?.data;
    } catch (err) {
      if (err?.response?.data) {
        throw new HttpException(
          err.response.data,
          err.response.data.statusCode,
        );
      }

      throw err;
    }
  }
}
