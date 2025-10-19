export interface ILoginBody {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IRegisterBody {
  name: string;
  email: string;
  password: string;
}

export interface IRegisterResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ILogoutBody {
  userId: string;
}

export interface IGetSessionByTokenParams {
  accessToken: string;
  refreshToken: string;
}

export interface IGetSessionByTokenResponse {
  session: {
    userId: string;
    role: string;
  } | null;
  refreshSession: {
    userId: string;
    role: string;
  } | null;
}

export interface IRefreshSessionBody {
  refreshToken: string;
}

export interface IRefreshSessionResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IHttpAuthService {
  login: (body: ILoginBody) => Promise<ILoginResponse>;
  register: (body: IRegisterBody) => Promise<IRegisterResponse>;
  refreshSession: (
    body: IRefreshSessionBody,
  ) => Promise<IRefreshSessionResponse>;
  getSessionByToken: (
    params: IGetSessionByTokenParams,
  ) => Promise<IGetSessionByTokenResponse>;
  logout: (body: ILogoutBody) => Promise<void>;
}
