import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { ISession } from '../interfaces/session.interface';

export const CurrentSession = createParamDecorator(
  (_data, context: ExecutionContext): ISession => {
    const { session } = context.switchToHttp().getRequest();

    return session as ISession;
  },
);
