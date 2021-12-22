export type logindataTypes = {
  email: string;
  password: string;
};

export enum userRoles {
  user = 'user',
  admin = 'admin',
  manager = 'manager',
}

export interface IAuthstate {
  user: Iuser;
}

export interface Iuser {
  _id: string;
  name: string;
  role: string;
  email: string;
  avator: string;
  token: string;
}
