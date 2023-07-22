export interface IBook {
  _id?: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
}
export interface IUser {
  email: string;
  password: string;
}

export interface IApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    userId: string;
  };
}
