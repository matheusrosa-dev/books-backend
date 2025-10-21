export interface IGetByIdParams {
  userId: string;
}

export interface IGetByIdResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUpdateEmailBody {
  email: string;
}

export interface IHttpUsersService {
  getById: (userId: IGetByIdParams) => Promise<IGetByIdResponse>;
  updateEmail: (userId: string, body: IUpdateEmailBody) => Promise<void>;
}
