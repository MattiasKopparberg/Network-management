export interface Users {
    id: number;
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