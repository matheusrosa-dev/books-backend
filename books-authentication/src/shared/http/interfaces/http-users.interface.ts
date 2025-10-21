export interface ICreateUserBody {
  name: string;
  email: string;
}

export interface ICreateUserResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface IHttpUsersService {
  createUser: (body: ICreateUserBody) => Promise<ICreateUserResponse>;
}
