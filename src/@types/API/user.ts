export enum Role {
  ADMIN = "admin",
  USER = "user",
  GUEST = "guest"
}

export interface IUserSession {
  conversation: {
    conversation_id: string;
  },
  socketId?: string
}

export interface IUser {
  _id?: any;
  name: string;
  email: string;
  role: string;
  login: string;
  password?: string;
  session?: IUserSession;
}