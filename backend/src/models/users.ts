export interface Users {
  id: number;
  fname?: string;
  lname?: string;
  username?: string;
  user_group: string;
  email: string;
  password_hash: string;
}

export type PublicUser = Omit<Users, "password_hash">;

export interface LoginInput {
  email: string;
  password: string;
}

export interface CreateUserInput {
  email: string;
  password_hash: string;
}

export interface LoginResponse {
  user: PublicUser;
}