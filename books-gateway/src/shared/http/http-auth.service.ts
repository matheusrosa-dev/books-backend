import { Injectable } from '@nestjs/common';
import axios from 'axios';
import {
  IHttpAuthService,
  ILoginBody,
  ILoginResponse,
  ILogoutBody,
  IRefreshSessionBody,
  IRefreshSessionResponse,
  IRegisterBody,
  IRegisterResponse,
  IGetSessionByTokenParams,
  IGetSessionByTokenResponse,
} from './interfaces/http-auth.interface';
import { ConfigService } from '@nestjs/config';
import { ProxyError } from '../errors';

@Injectable()
export class HttpAuthService implements IHttpAuthService {
  private baseUrl: string;

  constructor(configService: ConfigService) {
    const authApiUrl = configService.get('http.authApiUrl')!;

    this.baseUrl = `${authApiUrl}/auth`;
  }

  async login(body: ILoginBody) {
    try {
      const response = await axios.post<ILoginResponse>(
        `${this.baseUrl}/login`,
        body,
      );

      return response.data;
    } catch (err) {
      throw new ProxyError(err);
    }
  }

  async register(body: IRegisterBody) {
    try {
      const response = await axios.post<IRegisterResponse>(
        `${this.baseUrl}/register`,
        body,
      );

      return response.data;
    } catch (err) {
      throw new ProxyError(err);
    }
  }

  async refreshSession(body: IRefreshSessionBody) {
    try {
      const response = await axios.post<IRefreshSessionResponse>(
        `${this.baseUrl}/refresh-session`,
        body,
      );

      return response.data;
    } catch (err) {
      throw new ProxyError(err);
    }
  }

  async getSessionByToken(params: IGetSessionByTokenParams) {
    try {
      const response = await axios.get<IGetSessionByTokenResponse>(
        `${this.baseUrl}/get-session-by-token`,
        {
          params,
        },
      );

      return response.data;
    } catch (err) {
      throw new ProxyError(err);
    }
  }

  async logout(body: ILogoutBody) {
    try {
      await axios.post(`${this.baseUrl}/logout`, body);
    } catch (err) {
      throw new ProxyError(err);
    }
  }
}
