export interface IUser {
  id?: number;
  email: string;
  password: string;
  name: string;
  birthday: Date;
  role?: string;
  mobile: string;
  avatar: string;
}

export interface ILoginRes {
  email: string;
  password: string;
}
