import { HttpException } from '@nestjs/common';

export class ProxyError extends HttpException {
  constructor(err: any) {
    const message = err.response?.data || 'Proxy error';
    const status = err.response?.status || 500;

    super(message, status);
  }
}
