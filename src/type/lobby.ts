export interface ILobby {
  name: string;
  capacity: number;
  describe: string | null;
  status: string | null;
  price: number;
  image: string;
  id: number;
}

export interface IILoobyBooked{
	date:Date
	session:number
}

export interface ITypeParty {
  id: number;
  nameParty: string;
  imageType: string;
}

export interface ILobbyRes {
  id?: number;
  name: string;
  capacity: string;
  describe: string;
  price: number;
  image: string;
}
