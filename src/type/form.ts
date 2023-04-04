export interface IFormLogin {
  userName: string;
  password: string;
}

export interface IFormRegister {
  email: string;
  password: string;
  name: string;
  birthday: Date;
  mobile: string;
  avatar: string;
}

export interface IFormUpdateUser {
  name: string;
  birthday: Date;
  mobile: string;
  avatar: string;
}
