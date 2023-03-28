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
  username: string;
  password: string;
  tokenDevice?: string;
}
